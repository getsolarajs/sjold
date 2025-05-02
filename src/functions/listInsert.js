module.exports = {
    name: "$listInsert", description: "Inserts item at 1-based index in list. Args: index;itemToInsert;item1;item2...", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: Requires index and itemToInsert]"; const index = parseInt(args[0], 10); const toInsert = args[1]; let items = args.slice(2);
        if (isNaN(index) || index < 1) return "[Error: Invalid index]"; const insertAt = Math.min(index - 1, items.length); // Clamp index
        items.splice(insertAt, 0, toInsert); return items.join(';');
    }
};