module.exports = {
    name: "$ramUsage", description: "Returns current RAM usage in MB (RSS).", takesBrackets: false,
    execute: async (context, args) => { return (process.memoryUsage().rss / 1024 / 1024).toFixed(2); }
};