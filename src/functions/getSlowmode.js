const { ChannelType } = require('discord.js');
module.exports = {
    name: "$getSlowmode",
    description: "Returns the slowmode delay (in seconds) for a channel. Args: [channelID]",
    takesBrackets: true,
    execute: async (context, args) => {
        const channelId = args[0]?.trim() || context.channel?.id;
        if (!channelId) return "[Error: $getSlowmode requires a channel context or channelID]";
        try {
            const channel = await context.client.channels.fetch(channelId);
            if (!channel) return `[Error: Channel with ID ${channelId} not found]`;
            if (![ChannelType.GuildText, ChannelType.GuildAnnouncement, ChannelType.GuildForum, ChannelType.GuildVoice, ChannelType.GuildStageVoice].includes(channel.type)) {
                 return "[Error: Channel type does not support slowmode]";
            }
            return channel.rateLimitPerUser?.toString() ?? "0";
        } catch (err) { return `[Error: Failed to get slowmode for channel ${channelId} - ${err.message}]`; }
    }
};