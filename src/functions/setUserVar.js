module.exports = {
    name: "$setUserVar", description: "Sets a variable associated with a specific user (optionally per-server). Args: varName;value;userID;[scope=global]", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 3) return "[Error: $setUserVar requires varName, value, and userID]";
        const varName = args[0].trim(); const value = args[1]; const userId = args[2].trim();
        const scope = args[3]?.trim().toLowerCase() || 'global';
        if (!varName) return "[Error: Variable name cannot be empty]"; if (!/^\d{17,19}$/.test(userId)) return "[Error: Invalid userID]";
        let dbKey;
        if (scope === 'local') { if (!context.guild) return "[Error: Local scope requires guild context]"; dbKey = `userGuildVars_${context.guild.id}_${userId}_${varName}`; }
        else if (scope === 'global') { dbKey = `userVars_${userId}_${varName}`; }
        else return "[Error: Invalid scope (global/local)]";
        try { await context.client.db.set(dbKey, value); return ""; }
        catch (e) { return `[DB Error: ${e.message}]`; }
    }
};