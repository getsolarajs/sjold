module.exports = {
    name: "$minute",
    description: "Returns the minute (0-59) for a timestamp. Args: [timestampMs=now]",
    takesBrackets: true,
    execute: async (context, args) => {
        const timestampMs = args[0] ? parseInt(args[0], 10) : Date.now();
        if (isNaN(timestampMs)) return "[Error: Invalid timestamp for $minute]";
        return new Date(timestampMs).getMinutes().toString();
    }
};