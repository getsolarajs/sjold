module.exports = {
    name: "$getServerVar", description: "Gets a variable associated with the current guild. Args: varName", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $getServerVar requires varName]"; const varName = args[0].trim();
        if (!context.guild) return "[Error: Requires guild context]"; if (!varName) return "[Error: Variable name cannot be empty]";
        const dbKey = `serverVars_${context.guild.id}_${varName}`;
        try { const value = await context.client.db.get(dbKey); return value !== null && value !== undefined ? String(value) : ""; }
        catch (e) { return `[DB Error: ${e.message}]`; }
    }
};