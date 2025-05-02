module.exports = {
    name: "$lastMessageID", description: "Returns the ID of the last message sent by $sendMessage or $reply in this execution.", takesBrackets: false,
    execute: async (context, args) => {
        return context.lastMessageID || "";
    }
};