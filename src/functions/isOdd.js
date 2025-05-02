module.exports = {
    name: "$isOdd", description: "Checks if a number is odd. Args: number", takesBrackets: true,
    execute: async (context, args) => { if (!args[0]) return "[Error: Requires number]"; const num = parseFloat(args[0]); if (isNaN(num)) return "false"; return (num % 2 !== 0).toString(); }
};