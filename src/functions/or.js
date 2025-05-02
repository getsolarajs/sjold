module.exports = {
    name: "$or",
    description: "Checks if at least one provided condition is true. Args: condition1;condition2;...",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length === 0) return "[Error: $or requires at least one condition]";
        for (const arg of args) {
            const condition = arg?.toLowerCase()?.trim();
            const isTrue = (condition === 'true' || condition === 'yes' || condition === '1');
            if (isTrue) return "true";
        }
        return "false";
    }
};