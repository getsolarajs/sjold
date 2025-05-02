module.exports = {
    name: "$deleteServerVar", description: "Deletes a variable associated with the current guild. Args: varName", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $deleteServerVar requires varName]"; const varName = args[0].trim();
        if (!context.guild) return "[Error: Requires guild context]"; if (!varName) return "[Error: Variable name cannot be empty]";
        const dbKey = `serverVars_${context.guild.id}_${varName}`;
        try { await context.client.db.delete(dbKey); return ""; }
        catch (e) { return `[DB Error: ${e.message}]`; }
    }
};