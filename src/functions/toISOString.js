module.exports = {
    name: "$toISOString", description: "Formats date as ISO 8601 string. Args: [timestampMs?]", takesBrackets: true,
    execute: async (context, args) => { const ts = args[0] ? parseInt(args[0], 10) : Date.now(); if (isNaN(ts)) return "[Error: Invalid timestamp]"; return new Date(ts).toISOString(); }
};