module.exports = {
    name: "$sum",
    description: "Calculates the sum of provided numbers. Args: num1;num2;...",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length === 0) return "[Error: $sum requires at least one number]";
        let sum = 0;
        for (const arg of args) {
            const num = parseFloat(arg);
            if (isNaN(num)) return `[Error: Invalid number "${arg}" in $sum]`;
            sum += num;
        }
        return sum.toString();
    }
};