module.exports = {
    name: "$userVoiceChannelID", description: "Returns the ID of the voice channel the user is in. Args: [userID]", takesBrackets: true,
    execute: async (context, args) => {
        const userId = args[0]?.trim() || context.user?.id; if (!userId) return "[Error: Cannot determine user]";
        if (!context.guild) return "[Error: $userVoiceChannelID requires guild context]";
        try { const member = await context.guild.members.fetch(userId); return member?.voice?.channelId || ""; }
        catch { return "[Error: User not found in guild]"; }
    }
};