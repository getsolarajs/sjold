module.exports = {
    name: "$botUsersCount", description: "Returns the total number of users the bot can see.", takesBrackets: false,
    execute: async (context, args) => { return context.client.users.cache.size.toString(); }
};