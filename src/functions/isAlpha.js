module.exports = {
    name: "$isAlpha", description: "Checks if text contains only alphabetic characters. Args: text", takesBrackets: true,
    execute: async (context, args) => { if (!args[0]) return "false"; return /^[a-zA-Z]+$/.test(args[0]).toString(); }
};