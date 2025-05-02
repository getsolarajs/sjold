module.exports = {
    name: "$channelName",
    description: "Returns the name of the current channel or the channel specified by ID.",
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
        if (targetChannel?.name !== undefined) return targetChannel.name;
        if (targetChannel) return "[Error: $channelName - Fetched channel type has no name]";
        return "[Error: $channelName - Could not determine channel context or fetch channel by ID]";
    }
};