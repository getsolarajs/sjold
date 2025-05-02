module.exports = {
    name: "$fetchMessage", description: "Fetches a message to ensure it's cached. Args: messageID;[channelID]", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $fetchMessage requires messageID]";
        const messageId = args[0]; const channelId = args[1]?.trim() || context.channel?.id;
        if (!channelId) return "[Error: Cannot determine channel context/ID]";
        try { const channel = await context.client.channels.fetch(channelId); if (!channel?.messages) return "[Error: Invalid channel]"; await channel.messages.fetch(messageId); return messageId; }
        catch { return "[Error: Could not fetch message]"; }
    }
};