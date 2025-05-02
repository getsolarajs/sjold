module.exports = {
    name: "$toUppercase",
    description: "Converts text to uppercase.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "";
        return args[0].toUpperCase();
    }
};