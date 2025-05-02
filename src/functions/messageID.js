module.exports = {
    name: "$messageID",
    description: "Returns the ID of the command message (if applicable).",
    takesBrackets: false,
    execute: async (context, args) => {
        if (!context.message) return "[Error: Command is not a message]";
        return context.message.id;
    }
};