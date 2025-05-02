module.exports = {
    name: "$cacheDelete", description: "Deletes a key from the simple in-memory cache. Args: key", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $cacheDelete requires key]"; const key = args[0];
        context.client.cache.delete(key); return "";
    }
};