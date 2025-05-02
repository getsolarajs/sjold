module.exports = {
    name: "$isAlphaNumeric", description: "Checks if text contains only alphanumeric characters. Args: text", takesBrackets: true,
    execute: async (context, args) => { if (!args[0]) return "false"; return /^[a-zA-Z0-9]+$/.test(args[0]).toString(); }
};