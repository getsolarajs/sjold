module.exports = {
    name: "$charCount",
    description: "Counts occurrences of a character/substring within text. Args: text;characterOrSubstring",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $charCount requires text and character/substring to count]";
        const text = args[0];
        const search = args[1];
        if (!search) return "0"; 
        return (text.split(search).length - 1).toString();
    }
};