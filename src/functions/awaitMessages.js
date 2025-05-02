module.exports = {
    name: "$awaitMessages", description: "Awaits a single message from a user. Returns content or empty. Args: filterUserID;timeMs", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $awaitMessages requires filterUserID and timeMs]";
        if (!context.channel || !context.channel.awaitMessages) return "[Error: Requires valid channel context]";
        const filterUserID = args[0]; const timeMs = parseInt(args[1], 10);
        if (!/^\d{17,19}$/.test(filterUserID)) return "[Error: Invalid filterUserID]"; if (isNaN(timeMs) || timeMs <= 0) return "[Error: Invalid timeMs]";
        const filter = msg => msg.author.id === filterUserID;
        try { const collected = await context.channel.awaitMessages({ filter, max: 1, time: timeMs, errors: ['time'] }); const firstMsg = collected.first(); return firstMsg?.content || ""; }
        catch { return ""; } 
    }
};