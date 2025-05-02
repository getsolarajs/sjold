module.exports = {
    name: "$cacheSize", description: "Returns the number of items in the bot's simple cache.", takesBrackets: false,
    execute: async (context, args) => { return context.client.cache?.size.toString() ?? "0"; }
};