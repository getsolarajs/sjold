const { ActivityType } = require('discord.js');
module.exports = {
    name: "$userActivityType", description: "Returns the type of the user's primary activity. Args: [userID]", takesBrackets: true,
    execute: async (context, args) => {
        const userId = args[0]?.trim() || context.user?.id; if (!userId) return "[Error: Cannot determine user]";
        if (!context.guild) return "[Error: $userActivity requires guild context for presence]"; // Need guild for member presence
        try { const member = await context.guild.members.fetch(userId); const activity = member?.presence?.activities?.[0]; return activity ? ActivityType[activity.type] : "None"; }
        catch { return "[Error: User not found in guild or presence unavailable]"; }
    }
};