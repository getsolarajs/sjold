module.exports = {
    name: "$day",
    description: "Returns the day of the month (1-31) for a timestamp. Args: [timestampMs=now]",
    takesBrackets: true,
    execute: async (context, args) => {
        const timestampMs = args[0] ? parseInt(args[0], 10) : Date.now();
        if (isNaN(timestampMs)) return "[Error: Invalid timestamp for $day]";
        return new Date(timestampMs).getDate().toString();
    }
};