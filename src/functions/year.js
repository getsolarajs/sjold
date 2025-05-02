module.exports = {
    name: "$year",
    description: "Returns the full year (YYYY) for a timestamp. Args: [timestampMs=now]",
    takesBrackets: true,
    execute: async (context, args) => {
        const timestampMs = args[0] ? parseInt(args[0], 10) : Date.now();
        if (isNaN(timestampMs)) return "[Error: Invalid timestamp for $year]";
        return new Date(timestampMs).getFullYear().toString();
    }
};