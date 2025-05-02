module.exports = {
    name: "$truncate", description: "Removes the fractional part of a number. Args: number", takesBrackets: true,
    execute: async (context, args) => { if (!args[0]) return "[Error: Requires number]"; const num = parseFloat(args[0]); if (isNaN(num)) return "[Error: Invalid number]"; return Math.trunc(num).toString(); }
};