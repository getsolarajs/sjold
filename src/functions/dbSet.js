module.exports = {
    name: "$dbSet", description: "Sets a key-value pair in the database. Args: key;value", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $dbSet requires key and value]"; const key = args[0]; const value = args.slice(1).join(';'); // Allow semicolons in value
        try { await context.client.db.set(key, value); return ""; }
        catch (e) { return `[DB Error: ${e.message}]`; }
    }
};