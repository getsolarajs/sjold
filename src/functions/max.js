module.exports = {
    name: "$max",
    description: "Returns the highest number from a list. Args: num1;num2;...",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length === 0) return "[Error: $max requires at least one number]";
        const numbers = args.map(parseFloat);
        if (numbers.some(isNaN)) return "[Error: All arguments for $max must be numbers]";
        return Math.max(...numbers).toString();
    }
};