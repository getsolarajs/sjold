module.exports = {
    name: "$hour",
    description: "Returns the hour (0-23) for a timestamp. Args: [timestampMs=now]",
    takesBrackets: true,
    execute: async (context, args) => {
        const timestampMs = args[0] ? parseInt(args[0], 10) : Date.now();
        if (isNaN(timestampMs)) return "[Error: Invalid timestamp for $hour]";
        return new Date(timestampMs).getHours().toString();
    }
};