module.exports = {
    name: "$listRemoveAll", description: "Removes all occurrences of item from list. Args: itemToRemove;item1;item2...", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 1) return "[Error: Requires itemToRemove]"; if (args.length === 1) return "";
        const toRemove = args[0]; const items = args.slice(1);
        const filtered = items.filter(item => item !== toRemove); return filtered.join(';');
    }
};