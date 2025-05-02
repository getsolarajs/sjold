module.exports = {
    name: "$messageReactionUsers", description: "Returns semicolon-separated list of user IDs who reacted with an emoji. Args: messageID;emoji", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: Requires messageID and emoji]"; const messageId = args[0]; const emoji = args[1]; const channel = context.channel; if (!channel) return "[Error: Cannot determine channel context]";
        try { const msg = await channel.messages.fetch(messageId); const reaction = msg.reactions.cache.get(emoji); if (!reaction) return ""; await reaction.users.fetch(); return reaction.users.cache.map(u => u.id).join(';'); }
        catch (e) { return `[Error fetching reaction users: ${e.message}]`; }
    }
};