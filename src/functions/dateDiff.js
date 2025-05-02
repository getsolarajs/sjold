module.exports = {
    name: "$dateDiff",
    description: "Calculates the difference between two timestamps in milliseconds. Args: timestampMs1;timestampMs2",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $dateDiff requires two timestamps in milliseconds]";
        const ts1 = parseInt(args[0], 10); const ts2 = parseInt(args[1], 10);
        if (isNaN(ts1) || isNaN(ts2)) return "[Error: Invalid timestamp number(s) for $dateDiff]";
        return Math.abs(ts1 - ts2).toString();
    }
};