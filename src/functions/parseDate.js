module.exports = {
    name: "$parseDate", description: "Parses date string to ms timestamp. Args: dateString", takesBrackets: true,
    execute: async (context, args) => { if (!args[0]) return "[Error: Requires dateString]"; const d = new Date(args[0]); return isNaN(d.getTime()) ? "[Error: Invalid date string]" : d.getTime().toString(); }
};