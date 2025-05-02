module.exports = {
    name: "$dbDelete", description: "Deletes a key from the database. Args: key", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $dbDelete requires key]"; const key = args[0];
        try { await context.client.db.delete(key); return ""; }
        catch (e) { return `[DB Error: ${e.message}]`; }
    }
};