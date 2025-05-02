module.exports = {
    name: "$dbPush", description: "Pushes a value onto an array in the database. Args: key;value", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $dbPush requires key and value]"; const key = args[0]; const value = args.slice(1).join(';');
        try { await context.client.db.push(key, value); return ""; }
        catch (e) { return `[DB Error: ${e.message}]`; }
    }
};