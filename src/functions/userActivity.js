module.exports = {
    name: "$userActivityEmoji", description: "Returns the emoji of the user's custom status activity. Args: [userID]", takesBrackets: true,
    execute: async (context, args) => {
        const userId = args[0]?.trim() || context.user?.id; if (!userId) return "[Error: Cannot determine user]";
        if (!context.guild) return "[Error: $userActivity requires guild context for presence]";
        try { const member = await context.guild.members.fetch(userId); const customStatus = member?.presence?.activities?.find(a => a.type === 4); return customStatus?.emoji?.toString() || ""; } // Type 4 is Custom
        catch { return "[Error: User not found in guild or presence unavailable]"; }
    }
};