module.exports = {
    name: "$isPrime", description: "Checks if a number is prime (basic check). Args: number", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires number]"; const num = parseInt(args[0], 10);
        if (isNaN(num) || num <= 1) return "false"; if (num <= 3) return "true"; if (num % 2 === 0 || num % 3 === 0) return "false";
        for (let i = 5; i * i <= num; i = i + 6) { if (num % i === 0 || num % (i + 2) === 0) return "false"; } return "true";
    }
};