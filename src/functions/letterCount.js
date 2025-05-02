module.exports = {
    name: "$letterCount", description: "Counts the number of letters (alphabetic chars) in text. Args: text", takesBrackets: true,
    execute: async (context, args) => { if (!args[0]) return "0"; const letters = args[0].match(/[a-zA-Z]/g); return letters ? letters.length.toString() : "0"; }
};