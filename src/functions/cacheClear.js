module.exports = {
    name: "$cacheClear", description: "Clears the entire simple in-memory cache.", takesBrackets: false,
    execute: async (context, args) => { context.client.cache.clear(); return ""; }
};