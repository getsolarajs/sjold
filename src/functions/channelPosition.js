module.exports = {
    name: "$channelPosition",
    description: "Returns the position of the current channel or the channel specified by ID within its category/type.",
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
        if (targetChannel?.position !== undefined) return targetChannel.position.toString();
        if (targetChannel) return "[Error: Could not determine channel position]";
        return "[Error: $channelPosition - Could not determine channel context or fetch channel by ID]";
    }
};