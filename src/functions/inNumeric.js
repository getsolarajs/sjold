module.exports = {
    name: "$isNumeric", description: "Checks if text contains only numeric digits. Args: text", takesBrackets: true,
    execute: async (context, args) => { if (!args[0]) return "false"; return /^\d+$/.test(args[0]).toString(); }
};