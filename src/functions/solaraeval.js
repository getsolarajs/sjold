const StopExecutionError = require('../errors/StopExecutionError');
module.exports = {
    name: "$solaraEval",
    description: "Parses and executes solara code provided as input. [OWNER ONLY]",
    takesBrackets: true,
    execute: async (context, args) => {
        const codeToParse = args[0];
        if (!codeToParse) return "[Error: $solaraEval requires solara code inside the brackets]";
        try {
            const evalResult = await context.client.functionParser.parse(codeToParse, context);
            return evalResult;
        } catch (error) {
             if (error instanceof StopExecutionError) throw error;
             console.error(`Error during $solaraEval parsing:`, error);
             return `[Eval Parse Error: ${error.message || error}]`;
        }
    }
};