module.exports = {
    name: "$listItem",
    description: "Returns the item at a specific index (1-based) from a list of arguments. Args: index;item1;item2;...",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $listItem requires an index and at least one item]";
        const index = parseInt(args[0], 10); const items = args.slice(1);
        if (isNaN(index) || index < 1) return "[Error: $listItem requires a positive number index]";
        if (index > items.length) return "";
        return items[index - 1];
    }
};