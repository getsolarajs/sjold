module.exports = {
    name: "$setServerVar", description: "Sets a variable associated with the current guild. Args: varName;value", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $setServerVar requires varName and value]";
        const varName = args[0].trim(); const value = args[1];
        if (!context.guild) return "[Error: Requires guild context]"; if (!varName) return "[Error: Variable name cannot be empty]";
        const dbKey = `serverVars_${context.guild.id}_${varName}`;
        try { await context.client.db.set(dbKey, value); return ""; }
        catch (e) { return `[DB Error: ${e.message}]`; }
    }
};