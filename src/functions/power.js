module.exports = {
    name: "$power",
    description: "Calculates the base to the exponent power. Args: base;exponent",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $power requires base and exponent]";
        const base = parseFloat(args[0]);
        const exponent = parseFloat(args[1]);
        if (isNaN(base) || isNaN(exponent)) return "[Error: Invalid numbers for $power]";
        return Math.pow(base, exponent).toString();
    }
};