module.exports = {
    name: "$min",
    description: "Returns the lowest number from a list. Args: num1;num2;...",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length === 0) return "[Error: $min requires at least one number]";
        const numbers = args.map(parseFloat);
        if (numbers.some(isNaN)) return "[Error: All arguments for $min must be numbers]";
        return Math.min(...numbers).toString();
    }
};