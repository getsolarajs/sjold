module.exports = {
    name: "$isNsfw",
    description: "Checks if the current channel or the channel specified by ID is marked as NSFW. Returns true or false.",
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
        if (targetChannel?.nsfw !== undefined) return targetChannel.nsfw.toString();
        if (targetChannel) return "[Error: Cannot determine NSFW status for this channel type]";
        return "[Error: $isNsfw - Could not determine channel context or fetch channel by ID]";
    }
};