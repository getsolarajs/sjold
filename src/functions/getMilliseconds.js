module.exports = {
    name: "$getMilliseconds", description: "Gets milliseconds part of timestamp (0-999). Args: [timestampMs?]", takesBrackets: true,
    execute: async (context, args) => { const ts = args[0] ? parseInt(args[0], 10) : Date.now(); if (isNaN(ts)) return "[Error: Invalid timestamp]"; return new Date(ts).getMilliseconds().toString(); }
};