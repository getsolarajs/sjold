module.exports = {
    name: "$channelTopic",
    description: "Returns the topic of the current channel or the channel specified by ID.",
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
        if (targetChannel?.topic !== undefined) return targetChannel.topic || "";
        if (targetChannel) return "[Error: $channelTopic - Channel type does not support topics]";
        return "[Error: $channelTopic - Could not determine channel context or fetch channel by ID]";
    }
};