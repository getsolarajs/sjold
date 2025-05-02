module.exports = {
    name: "$activity", description: "Alias for $userActivityName.", takesBrackets: true,
    execute: async (context, args) => {
        const userId = args[0]?.trim() || context.user?.id; if (!userId) return "[Error: Cannot determine user]"; if (!context.guild) return "[Error: Requires guild context]";
        try { const member = await context.guild.members.fetch(userId); return member?.presence?.activities?.[0]?.name ?? "None"; } catch { return "[Error: User not found/presence unavailable]"; }
    }
};