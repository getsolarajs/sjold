module.exports = {
    name: "$ceil",
    description: "Rounds a number up to the nearest integer.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $ceil requires a number]";
        const num = parseFloat(args[0]);
        if (isNaN(num)) return `[Error: Invalid number "${args[0]}" for $ceil]`;
        return Math.ceil(num).toString();
    }
};