const StopExecutionError = require('../errors/StopExecutionError');
module.exports = {
    name: "$solaraEval",
    description: "Parses and executes Solara code provided as input.",
    takesBrackets: true,
    execute: async (context, args) => {
        const codeToParse = args[0];
        if (!codeToParse) return "[Error: $solaraEval requires Solara code inside the brackets]";
        try {
            const evalResult = await context.client.functionParser.parse(codeToParse, context);
            return evalResult;
        } catch (error) {
             if (error instanceof StopExecutionError) throw error;
             return `[Eval Parse Error: ${error.message || error}]`;
        }
    }
};