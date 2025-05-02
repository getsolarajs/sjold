module.exports = {
    name: "$charAt",
    description: "Returns the character at a specific index (0-based) in a string. Args: text;index",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $charAt requires text and index]";
        const text = args[0];
        const index = parseInt(args[1], 10);
        if (isNaN(index) || index < 0 || index >= text.length) return "";
        return text.charAt(index);
    }
};