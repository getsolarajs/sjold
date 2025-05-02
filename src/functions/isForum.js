const { ChannelType } = require('discord.js');
module.exports = {
    name: "$isForum",
    description: "Checks if the current or specified channel ID is a forum channel. Args: [channelID]",
    takesBrackets: true,
    execute: async (context, args) => {
        const channelId = args[0]?.trim() || context.channel?.id;
        if (!channelId) return "[Error: Cannot determine channel context/ID for $isForum]";
        try {
            const channel = await context.client.channels.fetch(channelId);
            return (channel?.type === ChannelType.GuildForum).toString();
        } catch { return "false"; }
    }
};