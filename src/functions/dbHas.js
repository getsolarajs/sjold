module.exports = {
    name: "$dbHas", description: "Checks if a key exists in the database. Args: key", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $dbHas requires key]"; const key = args[0];
        try { const exists = await context.client.db.has(key); return exists.toString(); }
        catch (e) { return `[DB Error: ${e.message}]`; }
    }
};