module.exports = {
    name: "$toUTCString", description: "Formats date as UTC string. Args: [timestampMs?]", takesBrackets: true,
    execute: async (context, args) => { const ts = args[0] ? parseInt(args[0], 10) : Date.now(); if (isNaN(ts)) return "[Error: Invalid timestamp]"; return new Date(ts).toUTCString(); }
};