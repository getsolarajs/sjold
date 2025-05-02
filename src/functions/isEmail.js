module.exports = {
    name: "$isEmail", description: "Checks if text resembles an email address (basic regex). Args: text", takesBrackets: true,
    execute: async (context, args) => { if (!args[0]) return "false"; const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; return emailRegex.test(args[0]).toString(); }
};