module.exports = {
    name: "$threadParentID",
    description: "Returns the parent channel ID of the current or specified thread ID.",
    takesBrackets: true,
    execute: async (context, args) => {
        const channelId = args[0]?.trim() || context.channel?.id;
        if (!channelId) return "[Error: $threadParentID requires channel context or ID]";
        try {
            const channel = await context.client.channels.fetch(channelId);
            if (!channel?.isThread()) return "[Error: Specified channel is not a thread]";
            return channel.parentId || "";
        } catch { return "[Error: Channel not found]"; }
    }
};