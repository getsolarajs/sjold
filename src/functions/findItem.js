module.exports = {
    name: "$findItem",
    description: "Finds the first index (1-based) of an item in a list. Args: searchItem;item1;item2;...",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $findItem requires searchItem and at least one item]";
        const searchItem = args[0]; const items = args.slice(1);
        const index = items.indexOf(searchItem);
        return (index === -1) ? "-1" : (index + 1).toString();
    }
};