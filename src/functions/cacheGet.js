module.exports = {
    name: "$cacheGet", description: "Gets a value from the simple in-memory cache. Args: key", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $cacheGet requires key]"; const key = args[0];
        const value = context.client.cache.get(key);
        return value !== undefined ? String(value) : "";
    }
};