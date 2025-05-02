module.exports = {
    name: "$listContains",
    description: "Checks if a list contains a specific item. Args: searchItem;item1;item2;...",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $listContains requires searchItem and at least one item]";
        const searchItem = args[0];
        const items = args.slice(1);
        return items.includes(searchItem).toString();
    }
};