module.exports = {
    name: "$warnUser", description: "Adds a warning to a user's record. Args: userID;reason;[moderatorID?]", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: Requires userID and reason]";
        const userId = args[0]; const reason = args[1]; const moderatorId = args[2] || context.user?.id;
        if (!/^\d{17,19}$/.test(userId)) return "[Error: Invalid userID]";
        const warnData = { reason: reason, timestamp: Date.now(), moderatorId: moderatorId, guildId: context.guild?.id };
        try { await context.client.db.push(`warnings_${userId}`, warnData); return ""; }
        catch (e) { return `[Error saving warning: ${e.message}]`; }
    }
};