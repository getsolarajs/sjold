module.exports = {
    name: "$textSplit",
    description: "Splits text by a separator and stores it in a temporary local variable 'textSplitResult'. Args: text;[separator=;]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $textSplit requires text]";
        const text = args[0];
        const separator = args[1] !== undefined ? args[1] : ';';
        const result = text.split(separator);
        if (!context.localVariables) context.localVariables = new Map();
        context.localVariables.set('textSplitResult', result);
        return ""; 
    }
};