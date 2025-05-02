module.exports = {
    name: "$length",
    description: "Returns the length of the provided text.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "0";
        return args[0].length.toString();
    }
};