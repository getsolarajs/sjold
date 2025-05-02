module.exports = {
    name: "$trimStart",
    description: "Removes whitespace from the beginning of a string.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "";
        return args[0].trimStart();
    }
};