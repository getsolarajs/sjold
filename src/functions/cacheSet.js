module.exports = {
    name: "$cacheSet", description: "Sets a value in the simple in-memory cache. Args: key;value;[ttlSeconds]", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $cacheSet requires key and value]";
        const key = args[0]; const value = args[1]; const ttl = args[2] ? parseInt(args[2], 10) : 0;
        if (!key) return "[Error: Cache key cannot be empty]";
        context.client.cache.set(key, value);
        if (ttl > 0) setTimeout(() => context.client.cache.delete(key), ttl * 1000);
        return "";
    }
};