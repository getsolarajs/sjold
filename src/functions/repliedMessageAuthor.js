module.exports = {
    name: "$repliedMessageAuthor",
    description: "Returns the User ID of the author of the message being replied to.",
    takesBrackets: false,
    execute: async (context, args) => {
        if (!context.message || !context.message.reference || !context.message.reference.messageId) {
            return "";
        }
        try {
             const channel = context.channel;
             if (!channel) return "[Error: Cannot determine channel context]";
             const repliedMessage = await channel.messages.fetch(context.message.reference.messageId);
             return repliedMessage.author.id;
        } catch(e) {
             return "[Error: Failed to fetch replied message]";
        }
    }
};