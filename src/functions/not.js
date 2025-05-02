module.exports = {
    name: "$not",
    description: "Reverses a boolean condition. Args: condition",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length === 0) return "[Error: $not requires a condition]";
        const condition = args[0]?.toLowerCase()?.trim();
        const isTrue = (condition === 'true' || condition === 'yes' || condition === '1');
        return (!isTrue).toString();
    }
};