module.exports = {
    name: "$parentName",
    description: "Returns the category name of the current channel or the channel specified by ID.",
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
        if (targetChannel?.parent) return targetChannel.parent.name;
        if (targetChannel?.parentId) return "[Error: Could not fetch parent category details]";
        if (targetChannel) return "";
        return "[Error: $parentName - Could not determine channel context or fetch channel by ID]";
    }
};