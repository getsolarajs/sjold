module.exports = {
    name: "$toLowercase",
    description: "Converts text to lowercase.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "";
        return args[0].toLowerCase();
    }
};