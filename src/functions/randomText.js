module.exports = {
    name: "$randomText",
    description: "Returns one random item from a semicolon-separated list.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length === 0 || !args[0]) return "[Error: $randomText requires at least one item]";
        const items = args.length === 1 ? args[0].split(';') : args;
        const cleanedItems = items.map(item => item.trim()).filter(item => item.length > 0);
        if (cleanedItems.length === 0) return "[Error: No valid items provided to $randomText]";
        const randomIndex = Math.floor(Math.random() * cleanedItems.length);
        return cleanedItems[randomIndex];
    }
};