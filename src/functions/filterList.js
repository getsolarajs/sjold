module.exports = {
    name: "$filterList", description: "Filters items matching a specific value. Args: filterValue;item1;item2;...", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 1) return "[Error: $filterList requires at least a filterValue]"; if (args.length === 1) return "";
        const filterValue = args[0]; const items = args.slice(1); const filtered = items.filter(item => item === filterValue); return filtered.join(';');
    }
};