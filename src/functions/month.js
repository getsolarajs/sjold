module.exports = {
    name: "$month",
    description: "Returns the month (1-12) for a timestamp. Args: [timestampMs=now]",
    takesBrackets: true,
    execute: async (context, args) => {
        const timestampMs = args[0] ? parseInt(args[0], 10) : Date.now();
        if (isNaN(timestampMs)) return "[Error: Invalid timestamp for $month]";
        return (new Date(timestampMs).getMonth() + 1).toString(); 
    }
};