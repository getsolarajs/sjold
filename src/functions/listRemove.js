module.exports = {
    name: "$listRemove", description: "Removes first occurrence of item from list. Args: itemToRemove;item1;item2...", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 1) return "[Error: Requires itemToRemove]"; if (args.length === 1) return "";
        const toRemove = args[0]; const items = args.slice(1); const index = items.indexOf(toRemove);
        if (index > -1) items.splice(index, 1); return items.join(';');
    }
};