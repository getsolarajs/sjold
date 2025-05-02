module.exports = {
    name: "$botAvatar",
    description: "Returns the client user's (the bot's) avatar URL.",
    takesBrackets: false,
    execute: async (context, args) => {
        return context.client.user.displayAvatarURL({ dynamic: true, size: 4096 });
    }
};