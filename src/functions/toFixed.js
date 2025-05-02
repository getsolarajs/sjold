module.exports = {
    name: "$toFixed",
    description: "Formats a number using fixed-point notation. Args: number;[digits=0]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $toFixed requires a number]";
        const num = parseFloat(args[0]);
        const digits = args[1] ? parseInt(args[1], 10) : 0;
        if (isNaN(num)) return `[Error: Invalid number "${args[0]}" for $toFixed]`;
        if (isNaN(digits) || digits < 0 || digits > 100) return "[Error: Invalid digit count for $toFixed (0-100)]";
        return num.toFixed(digits);
    }
};