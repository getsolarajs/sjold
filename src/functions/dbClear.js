module.exports = {
    name: "$dbClear", description: "Clears the entire database [DANGEROUS].", takesBrackets: false,
    execute: async (context, args) => {
        try { await context.client.db.deleteAll(); return ""; } // Use deleteAll
        catch (e) { return `[DB Error: ${e.message}]`; }
    }
};