module.exports = {
    name: "$deleteUserVar", description: "Deletes a variable associated with a specific user (optionally per-server). Args: varName;userID;[scope=global]", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $deleteUserVar requires varName and userID]";
        const varName = args[0].trim(); const userId = args[1].trim();
        const scope = args[2]?.trim().toLowerCase() || 'global';
        if (!varName) return "[Error: Variable name cannot be empty]"; if (!/^\d{17,19}$/.test(userId)) return "[Error: Invalid userID]";
        let dbKey;
        if (scope === 'local') { if (!context.guild) return "[Error: Local scope requires guild context]"; dbKey = `userGuildVars_${context.guild.id}_${userId}_${varName}`; }
        else if (scope === 'global') { dbKey = `userVars_${userId}_${varName}`; }
        else return "[Error: Invalid scope (global/local)]";
        try { await context.client.db.delete(dbKey); return ""; }
        catch (e) { return `[DB Error: ${e.message}]`; }
    }
};