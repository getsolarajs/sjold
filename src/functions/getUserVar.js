module.exports = {
    name: "$getUserVar", description: "Gets a variable associated with a specific user (optionally per-server). Args: varName;userID;[scope=global]", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $getUserVar requires varName and userID]";
        const varName = args[0].trim(); const userId = args[1].trim();
        const scope = args[2]?.trim().toLowerCase() || 'global';
        if (!varName) return "[Error: Variable name cannot be empty]"; if (!/^\d{17,19}$/.test(userId)) return "[Error: Invalid userID]";
        let dbKey;
        if (scope === 'local') { if (!context.guild) return "[Error: Local scope requires guild context]"; dbKey = `userGuildVars_${context.guild.id}_${userId}_${varName}`; }
        else if (scope === 'global') { dbKey = `userVars_${userId}_${varName}`; }
        else return "[Error: Invalid scope (global/local)]";
        try { const value = await context.client.db.get(dbKey); return value !== null && value !== undefined ? String(value) : ""; }
        catch (e) { return `[DB Error: ${e.message}]`; }
    }
};