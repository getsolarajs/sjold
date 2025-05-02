module.exports = {
    name: "$listGetRandom", description: "Returns N random unique items from a list. Args: count;item1;item2...", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: Requires count and items]"; const count = parseInt(args[0], 10); const items = args.slice(1);
        if (isNaN(count) || count < 1) return "[Error: Invalid count]"; if (items.length === 0) return "";
        const shuffled = items.sort(() => 0.5 - Math.random()); const numToGet = Math.min(count, items.length);
        return shuffled.slice(0, numToGet).join(';');
    }
};