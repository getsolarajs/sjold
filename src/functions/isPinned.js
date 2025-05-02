module.exports = {
    name: "$isPinned", description: "Checks if the trigger message (or specified message ID) is pinned. Args: [messageID]", takesBrackets: true,
    execute: async (context, args) => {
        const messageId = args[0]?.trim() || context.message?.id;
        if (!messageId) return "[Error: $isPinned requires message context or messageID]";
        const channel = context.channel;
        if (!channel || !channel.isTextBased()) return "[Error: Cannot determine valid text channel context]";
        try {
            const msg = await channel.messages.fetch(messageId);
            return msg.pinned.toString();
        } catch(e) {
             if (e.code === 10008) return "false";
             return "[Error: Could not fetch message to check pinned status]";
        }
    }
};