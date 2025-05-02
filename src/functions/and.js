module.exports = {
    name: "$and",
    description: "Checks if all provided conditions are true. Args: condition1;condition2;...",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length === 0) return "[Error: $and requires at least one condition]";
        for (const arg of args) {
            const condition = arg?.toLowerCase()?.trim();
            const isFalse = (condition === 'false' || condition === 'no' || condition === '0' || condition === '');
            if (isFalse) return "false";
        }
        return "true";
    }
};