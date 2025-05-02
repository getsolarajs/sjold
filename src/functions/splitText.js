module.exports = {
    name: "$splitText",
    description: "Retrieves an item by index from the result of the last $textSplit. Args: index",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $splitText requires an index]";
        const index = parseInt(args[0], 10);
        const splitResult = context.localVariables?.get('textSplitResult');

        if (!Array.isArray(splitResult)) {
             return "[Error: $textSplit must be used before $splitText]";
        }
        if (isNaN(index) || index < 1) return "[Error: $splitText requires a positive number index]";
        if (index > splitResult.length) return ""; 
        return splitResult[index - 1]; 
    }
};