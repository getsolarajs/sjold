module.exports = {
    name: "$trim",
    description: "Removes whitespace from both ends of a string.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "";
        return args[0].trim();
    }
};