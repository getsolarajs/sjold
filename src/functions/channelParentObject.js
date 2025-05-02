module.exports = {
    name: "$channelParentObject", description: "Returns JSON string of channel's parent CategoryChannel object. Args: [channelID?]", takesBrackets: true,
    execute: async (context, args) => {
        const channelId = args[0]?.trim() || context.channel?.id; if (!channelId) return "[Error: Requires channel context/ID]";
        try { const channel = await context.client.channels.fetch(channelId); return channel?.parent ? JSON.stringify(channel.parent) : ""; } catch { return "[Error fetching channel/parent]"; }
    }
};