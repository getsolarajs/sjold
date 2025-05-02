module.exports = {
    name: "$sign", description: "Returns the sign of a number (-1, 0, 1). Args: number", takesBrackets: true,
    execute: async (context, args) => { if (!args[0]) return "[Error: Requires number]"; const num = parseFloat(args[0]); if (isNaN(num)) return "[Error: Invalid number]"; return Math.sign(num).toString(); }
};