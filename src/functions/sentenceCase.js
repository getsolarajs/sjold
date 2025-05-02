module.exports = {
    name: "$sentenceCase", description: "Converts text to sentence case. Args: text", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return ""; const text = args[0].toLowerCase();
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
};