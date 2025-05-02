module.exports = {
    name: "$messageExists",
    description: "Checks if a message exists in a channel. Args: messageID;channelID",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $messageExists requires messageID and channelID]";
        const messageId = args[0];
        const channelId = args[1];
        try {
            const channel = await context.client.channels.fetch(channelId);
            if (!channel || !channel.messages) return "[Error: Invalid channel or channel type]";
            await channel.messages.fetch(messageId);
            return "true";
        } catch (err) { if (err.code === 10008) return "false"; return "false"; }
    }
};