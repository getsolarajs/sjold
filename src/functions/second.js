module.exports = {
    name: "$second",
    description: "Returns the second (0-59) for a timestamp. Args: [timestampMs=now]",
    takesBrackets: true,
    execute: async (context, args) => {
        const timestampMs = args[0] ? parseInt(args[0], 10) : Date.now();
        if (isNaN(timestampMs)) return "[Error: Invalid timestamp for $second]";
        return new Date(timestampMs).getSeconds().toString();
    }
};