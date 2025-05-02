const { ChannelType } = require('discord.js');
module.exports = {
    name: "$channelType",
    description: "Returns the type of the current channel or the channel specified by ID.",
    takesBrackets: true,
    execute: async (context, args) => {
        const channelId = args[0]?.trim();
        let targetChannel = null;
        if (channelId) {
            try { targetChannel = context.client.channels.cache.get(channelId) || await context.client.channels.fetch(channelId); }
            catch (e) { return `[Error: Could not find channel with ID ${channelId}]`; }
        } else {
            targetChannel = context.channel;
        }
        if (targetChannel?.type !== undefined) return ChannelType[targetChannel.type] || targetChannel.type.toString();
        if (targetChannel) return "[Error: Could not determine channel type]";
        return "[Error: $channelType - Could not determine channel context or fetch channel by ID]";
    }
};