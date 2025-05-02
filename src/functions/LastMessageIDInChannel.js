module.exports = {
    name: "$lastMessageIDInChannel",
    description: "Returns the ID of the last message sent in the current or specified channel.",
    takesBrackets: true,
    execute: async (context, args) => {
        const channelId = args[0]?.trim() || context.channel?.id;
        if (!channelId) return "[Error: $lastMessageIDInChannel requires channel context or ID]";
        try {
            const channel = await context.client.channels.fetch(channelId);
            if (!channel || !channel.isTextBased()) return "[Error: Channel not found or not text-based]";
            return channel.lastMessageId || "";
        } catch (e) { return `[Error fetching channel ${channelId}: ${e.message}]`; }
    }
};