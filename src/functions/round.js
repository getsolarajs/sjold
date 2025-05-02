module.exports = {
    name: "$round",
    description: "Rounds a number to the nearest integer.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $round requires a number]";
        const num = parseFloat(args[0]);
        if (isNaN(num)) return `[Error: Invalid number "${args[0]}" for $round]`;
        return Math.round(num).toString();
    }
};