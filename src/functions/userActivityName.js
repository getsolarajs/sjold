module.exports = {
    name: "$userActivityName", description: "Returns the name of the user's primary activity. Args: [userID]", takesBrackets: true,
    execute: async (context, args) => {
        const userId = args[0]?.trim() || context.user?.id; if (!userId) return "[Error: Cannot determine user]";
        if (!context.guild) return "[Error: $userActivity requires guild context for presence]";
        try { const member = await context.guild.members.fetch(userId); return member?.presence?.activities?.[0]?.name ?? "None"; }
        catch { return "[Error: User not found in guild or presence unavailable]"; }
    }
};