module.exports = {
    name: "$dayOfWeek",
    description: "Returns the day of the week (0=Sun, 6=Sat) for a timestamp. Args: [timestampMs=now]",
    takesBrackets: true,
    execute: async (context, args) => {
        const timestampMs = args[0] ? parseInt(args[0], 10) : Date.now();
        if (isNaN(timestampMs)) return "[Error: Invalid timestamp for $dayOfWeek]";
        return new Date(timestampMs).getDay().toString();
    }
};