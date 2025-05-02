module.exports = {
    name: "$isNumber",
    description: "Checks if the provided text is a valid number. Args: text",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "false"; // Empty string is not a number
        return (!isNaN(parseFloat(args[0])) && isFinite(args[0])).toString();
    }
};