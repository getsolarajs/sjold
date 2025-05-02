module.exports = {
    name: "$repeatText", description: "Repeats text a specified number of times. Args: text;count", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: Requires text and count]"; const text = args[0]; const count = parseInt(args[1], 10);
        if (isNaN(count) || count < 0) return "[Error: Invalid count]"; if (count === 0) return "";
        try { return text.repeat(count).slice(0, 2000); }
        catch { return "[Error repeating text]"; }
    }
};