module.exports = {
    name: "$abs",
    description: "Returns the absolute value of a number.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $abs requires a number]";
        const num = parseFloat(args[0]);
        if (isNaN(num)) return `[Error: Invalid number "${args[0]}" for $abs]`;
        return Math.abs(num).toString();
    }
};