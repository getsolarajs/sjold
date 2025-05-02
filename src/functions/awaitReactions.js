module.exports = {
    name: "$awaitReactions", description: "Awaits reactions on a message. [Basic Implementation]. Args: messageID;timeMs;emoji1;[emoji2...];[maxUsers=1];[removeReaction?]", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 3) return "[Error: Requires messageID, timeMs, and emojis]";
        const messageId = args[0]; const timeMs = parseInt(args[1], 10); const emojis = args.slice(2);
        const maxUsers = args[emojis.length+2] ? parseInt(args[emojis.length+2], 10) : 1;
        const filter = (reaction, user) => emojis.includes(reaction.emoji.name) && !user.bot;
        try {
            const collected = await message.awaitReactions({ filter, max: maxUsers, time: timeMs, errors: ['time'] });
            const firstReaction = collected.first();
            return firstReaction?.emoji.name || "";
        } catch { return ""; }
    }
};