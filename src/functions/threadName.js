module.exports = {
    name: "$threadName", 
    description: "Returns the name of the current or specified thread ID.",
    takesBrackets: true,
    execute: async (context, args) => {
        const channelId = args[0]?.trim() || context.channel?.id;
        if (!channelId) return "[Error: $threadName requires channel context or ID]";
        try {
            const channel = await context.client.channels.fetch(channelId);
            if (!channel?.isThread()) return "[Error: Specified channel is not a thread]";
            return channel.name;
        } catch { return "[Error: Channel not found]"; }
    }
};