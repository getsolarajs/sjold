module.exports = {
    name: "$findLastItem",
    description: "Finds the last index (1-based) of an item in a list. Args: searchItem;item1;item2;...",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $findLastItem requires searchItem and at least one item]";
        const searchItem = args[0];
        const items = args.slice(1);
        const index = items.lastIndexOf(searchItem);
        return (index === -1) ? "-1" : (index + 1).toString();
    }
};