module.exports = {
    name: "$isNaNFunc",
    description: "Checks if the provided value is NaN (Not-a-Number). Args: value",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "false";
        return isNaN(parseFloat(args[0])).toString();
    }
};