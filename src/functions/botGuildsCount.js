module.exports = {
    name: "$botGuildsCount", description: "Returns the number of guilds the bot is in.", takesBrackets: false,
    execute: async (context, args) => { return context.client.guilds.cache.size.toString(); }
};