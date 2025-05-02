module.exports = {
    name: "$botID",
    description: "Returns the client user's (the bot's) ID.",
    takesBrackets: false,
    execute: async (context, args) => {
        return context.client.user.id;
    }
};