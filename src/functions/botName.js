module.exports = {
    name: "$botName",
    description: "Returns the client user's (the bot's) username.",
    takesBrackets: false,
    execute: async (context, args) => {
        return context.client.user.username;
    }
};