module.exports = {
    name: "$isEven", description: "Checks if a number is even. Args: number", takesBrackets: true,
    execute: async (context, args) => { if (!args[0]) return "[Error: Requires number]"; const num = parseFloat(args[0]); if (isNaN(num)) return "false"; return (num % 2 === 0).toString(); }
};