module.exports = {
    name: "$charToCode",
    description: "Returns the Unicode value of the character at a specified index. Args: text;[index=0]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $charToCode requires text]";
        const text = args[0];
        const index = args[1] ? parseInt(args[1], 10) : 0;
        if (isNaN(index) || index < 0 || index >= text.length) return "[Error: Invalid index for $charToCode]";
        return text.charCodeAt(index).toString();
    }
};