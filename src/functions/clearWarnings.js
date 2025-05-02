module.exports = {
    name: "$clearWarnings", description: "Clears all warnings for a user. Args: userID", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires userID]"; const userId = args[0]; if (!/^\d{17,19}$/.test(userId)) return "[Error: Invalid userID]";
        try { await context.client.db.delete(`warnings_${userId}`); return ""; }
        catch (e) { return `[Error clearing warnings: ${e.message}]`; }
    }
};