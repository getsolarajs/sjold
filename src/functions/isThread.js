module.exports = {
    name: "$isThread",
    description: "Checks if the current or specified channel ID is a thread. Args: [channelID]",
    takesBrackets: true,
    execute: async (context, args) => {
        const channelId = args[0]?.trim() || context.channel?.id;
        if (!channelId) return "[Error: Cannot determine channel context/ID for $isThread]";
        try {
            const channel = await context.client.channels.fetch(channelId);
            return channel?.isThread().toString() ?? "false";
        } catch { return "false"; }
    }
};