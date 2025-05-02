module.exports = {
    name: "$div",
    description: "Divides numbers sequentially. Args: num1;num2;...",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $div requires at least two numbers]";
        let result = parseFloat(args[0]);
        if (isNaN(result)) return `[Error: Invalid number "${args[0]}" in $div]`;
        for (let i = 1; i < args.length; i++) {
            const num = parseFloat(args[i]);
            if (isNaN(num)) return `[Error: Invalid number "${args[i]}" in $div]`;
            if (num === 0) return "[Error: Division by zero in $div]";
            result /= num;
        }
        return result.toString();
    }
};