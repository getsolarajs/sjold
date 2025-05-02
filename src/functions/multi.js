module.exports = {
    name: "$multi",
    description: "Calculates the product of provided numbers. Args: num1;num2;...",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length === 0) return "[Error: $multi requires at least one number]";
        let product = 1;
        for (const arg of args) {
            const num = parseFloat(arg);
            if (isNaN(num)) return `[Error: Invalid number "${arg}" in $multi]`;
            product *= num;
        }
        return product.toString();
    }
};