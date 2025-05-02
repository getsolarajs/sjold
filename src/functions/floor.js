module.exports = {
    name: "$floor",
    description: "Rounds a number down to the nearest integer.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $floor requires a number]";
        const num = parseFloat(args[0]);
        if (isNaN(num)) return `[Error: Invalid number "${args[0]}" for $floor]`;
        return Math.floor(num).toString();
    }
};