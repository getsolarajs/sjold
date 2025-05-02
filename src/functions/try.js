const StopExecutionError = require('../errors/StopExecutionError');
module.exports = {
    name: "$try",
    description: "Executes code and catches errors. Args: codeToTry;[$catch[errorCode]]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $try requires code to execute]";
        const codeToTry = args[0]; const catchCode = args[1];
        let catchCodeContent = "";
        if (catchCode && catchCode.toLowerCase().startsWith("$catch[") && catchCode.endsWith("]")) {
             catchCodeContent = catchCode.slice(7, -1);
        } else if (catchCode) { return "[Error: Second argument to $try must be $catch[...]]"; }
        try {
            return await context.client.functionParser.parse(codeToTry, context);
        } catch (error) {
             console.warn(`$try: Caught error: ${error.message}`);
             if (error instanceof StopExecutionError) throw error; // Re-throw critical flow errors
             if (catchCodeContent) {
                  context.localVariables?.set('errorMsg', error.message || String(error));
                  const catchResult = await context.client.functionParser.parse(catchCodeContent, context);
                  context.localVariables?.delete('errorMsg');
                  return catchResult;
             } else { return ""; }
        }
    }
};