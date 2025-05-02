module.exports = {
    name: "$categoryID",
    description: "Returns the category ID of the current channel or the channel specified by ID.",
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
        if (targetChannel?.parentId !== undefined) return targetChannel.parentId || "";
        if (targetChannel) return "[Error: Channel type does not support categories]";
        return "[Error: $categoryID - Could not determine channel context or fetch channel by ID]";
    }
};