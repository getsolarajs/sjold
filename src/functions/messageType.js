const { MessageType } = require('discord.js');
module.exports = {
    name: "$messageType",
    description: "Returns the type of the command message (e.g., Default, Reply).",
    takesBrackets: false,
    execute: async (context, args) => {
        if (!context.message) return "[Error: $messageType requires message context]";
        return MessageType[context.message.type] ?? context.message.type.toString();
    }
};