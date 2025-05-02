module.exports = {
    name: "$modulo",
    description: "Returns the remainder of a division. Args: dividend;divisor",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $modulo requires dividend and divisor]";
        const dividend = parseFloat(args[0]);
        const divisor = parseFloat(args[1]);
        if (isNaN(dividend) || isNaN(divisor)) return "[Error: Invalid numbers for $modulo]";
        if (divisor === 0) return "[Error: Cannot perform modulo with divisor zero]";
        return (dividend % divisor).toString();
    }
};