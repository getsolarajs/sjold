module.exports = {
    name: "$sub",
    description: "Subtracts numbers sequentially. Args: num1;num2;...",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $sub requires at least two numbers]";
        let result = parseFloat(args[0]);
        if (isNaN(result)) return `[Error: Invalid number "${args[0]}" in $sub]`;
        for (let i = 1; i < args.length; i++) {
            const num = parseFloat(args[i]);
            if (isNaN(num)) return `[Error: Invalid number "${args[i]}" in $sub]`;
            result -= num;
        }
        return result.toString();
    }
};