module.exports = {
    name: "$cbrt",
    description: "Calculates the cube root of a number.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $cbrt requires a number]";
        const num = parseFloat(args[0]);
        if (isNaN(num)) return "[Error: Invalid number for $cbrt]";
        return Math.cbrt(num).toString();
    }
};