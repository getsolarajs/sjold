module.exports = {
    name: "$sqrt",
    description: "Calculates the square root of a number.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $sqrt requires a number]";
        const num = parseFloat(args[0]);
        if (isNaN(num) || num < 0) return "[Error: Invalid number for $sqrt (must be non-negative)]";
        return Math.sqrt(num).toString();
    }
};