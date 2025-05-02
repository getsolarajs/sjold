module.exports = {
    name: "$getWarnings", description: "Returns JSON array of warnings for a user. Args: userID", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires userID]"; const userId = args[0]; if (!/^\d{17,19}$/.test(userId)) return "[Error: Invalid userID]";
        try { const warnings = await context.client.db.get(`warnings_${userId}`) || []; return JSON.stringify(warnings); }
        catch (e) { return `[Error getting warnings: ${e.message}]`; }
    }
};