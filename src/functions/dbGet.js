module.exports = {
    name: "$dbGet", description: "Gets a value from the database by key. Args: key", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $dbGet requires key]"; const key = args[0];
        try { const value = await context.client.db.get(key); return value !== null && value !== undefined ? String(value) : ""; } // Return empty if null/undefined
        catch (e) { return `[DB Error: ${e.message}]`; }
    }
};