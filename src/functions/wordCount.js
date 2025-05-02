module.exports = {
    name: "$wordCount", description: "Counts the number of words in text. Args: text", takesBrackets: true,
    execute: async (context, args) => { if (!args[0]) return "0"; return (args[0].trim().split(/\s+/).filter(Boolean).length).toString(); }
};