const StopExecutionError = require('../errors/StopExecutionError');
module.exports = {
    name: "$forEach",
    description: "Executes code for each item in a list. Sets $forEachItem, $forEachIndex. Args: code;item1;item2;...",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $forEach requires code and at least one item]";
        const codeToRun = args[0];
        const items = args.slice(1);

        if (!context.localVariables) context.localVariables = new Map();
        let finalOutput = [];

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const index = i + 1; 

            context.localVariables.set('forEachItem', item);
            context.localVariables.set('forEachIndex', index.toString());

            try {
                 const iterationResult = await context.client.functionParser.parse(codeToRun, context);
                 if (iterationResult) finalOutput.push(iterationResult);
            } catch (error) {
                console.error(`$forEach: Error during iteration ${index}:`, error);
                finalOutput.push(`[Error on index ${index}: ${error.message}]`);
                 if (error instanceof StopExecutionError) {
                      console.warn("$forEach: StopExecutionError caught during iteration, stopping forEach.");
                      context.localVariables.delete('forEachItem');
                      context.localVariables.delete('forEachIndex');
                      throw error; 
                 }
            }
        }

        context.localVariables.delete('forEachItem');
        context.localVariables.delete('forEachIndex');

        return ""; 
    }
};