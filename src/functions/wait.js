module.exports = {
    name: "$wait",
    description: "Pauses execution for a specified time. Args: milliseconds",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $wait requires milliseconds]";
        const ms = parseInt(args[0], 10);
        if (isNaN(ms) || ms < 0) return "[Error: Invalid milliseconds for $wait]";
        const MAX_WAIT = 3600000;
        if (ms > MAX_WAIT) return `[Error: Wait time too long (Max ${MAX_WAIT}ms)]`;
        await new Promise(resolve => setTimeout(resolve, ms));
        return "";
    }
};