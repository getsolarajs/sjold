module.exports = {
    name: "$dayOfYear",
    description: "Returns the day of the year (1-366) for a timestamp. Args: [timestampMs=now]",
    takesBrackets: true,
    execute: async (context, args) => {
        const timestampMs = args[0] ? parseInt(args[0], 10) : Date.now();
        if (isNaN(timestampMs)) return "[Error: Invalid timestamp for $dayOfYear]";
        const date = new Date(timestampMs);
        const startOfYear = new Date(date.getFullYear(), 0, 0);
        const diff = date - startOfYear;
        const oneDay = 1000 * 60 * 60 * 24;
        const day = Math.floor(diff / oneDay);
        return day.toString();
    }
};