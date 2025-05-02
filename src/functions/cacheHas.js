module.exports = {
    name: "$cacheHas", description: "Checks if a key exists in the simple in-memory cache. Args: key", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $cacheHas requires key]"; const key = args[0];
        return context.client.cache.has(key).toString();
    }
};