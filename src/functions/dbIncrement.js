module.exports = {
    name: "$dbIncrement", description: "Increments a numeric value in the database. Args: key;[amount=1]", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $dbIncrement requires key]"; const key = args[0];
        const amount = args[1] ? parseFloat(args[1]) : 1; if (isNaN(amount)) return "[Error: Invalid increment amount]";
        try { await context.client.db.add(key, amount); return ""; } // quick.db add handles creation/increment
        catch (e) { return `[DB Error: ${e.message}]`; }
    }
};