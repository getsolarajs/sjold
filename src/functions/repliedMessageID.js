module.exports = {
    name: "$repliedMessageID",
    description: "Returns the ID of the message being replied to, if the command message is a reply.",
    takesBrackets: false,
    execute: async (context, args) => {
        if (!context.message || !context.message.reference || !context.message.reference.messageId) {
            return ""; 
        }
        return context.message.reference.messageId;
    }
};