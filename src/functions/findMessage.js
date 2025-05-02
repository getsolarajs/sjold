module.exports = {
    name: "$findMessage", description: "Finds the first message ID containing specific text in a channel. Args: query;[channelID?];[limit=50]", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $findMessage requires a query string]";
        const query = args[0].toLowerCase(); const channelId = args[1]?.trim() || context.channel?.id;
        const limit = args[2] ? parseInt(args[2], 10) : 50;
        if (!channelId) return "[Error: Cannot determine channel context/ID]";
        if (isNaN(limit) || limit < 1 || limit > 100) return "[Error: Invalid limit (1-100)]";
        try {
            const channel = await context.client.channels.fetch(channelId); if (!channel?.messages) return "[Error: Invalid channel]";
            const messages = await channel.messages.fetch({ limit: limit });
            const found = messages.find(m => m.content.toLowerCase().includes(query));
            return found?.id || "";
        } catch { return "[Error searching messages]"; }
    }
};