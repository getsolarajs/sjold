module.exports = {
    name: "$trimEnd",
    description: "Removes whitespace from the end of a string.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "";
        return args[0].trimEnd();
    }
};