module.exports = {
    name: "$isVoiceMuted", description: "Checks if the user is locally voice muted. Args: [userID]", takesBrackets: true,
    execute: async (context, args) => {
        const userId = args[0]?.trim() || context.user?.id; if (!userId) return "[Error: Cannot determine user]";
        if (!context.guild) return "[Error: $isVoiceMuted requires guild context]";
        try { const member = await context.guild.members.fetch(userId); return member?.voice?.mute?.toString() ?? "false"; }
        catch { return "[Error: User not found in guild]"; }
    }
};