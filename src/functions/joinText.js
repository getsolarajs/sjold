module.exports = {
    name: "$joinText",
    description: "Joins provided items with a separator. Args: separator;item1;item2;...",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 1) return "[Error: $joinText requires a separator]";
        if (args.length === 1) return "";
        const separator = args[0]; const items = args.slice(1);
        return items.join(separator);
    }
};