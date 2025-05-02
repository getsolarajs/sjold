module.exports = {
    name: "$getMessageReactions", description: "Returns semicolon-separated list of reaction counts or users. Args: messageID;[emoji];[property=count/users]", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $getMessageReactions requires messageID]";
        const messageId = args[0]; const emoji = args[1]; const prop = args[2]?.toLowerCase() || 'count';
        const channel = context.channel; if (!channel) return "[Error: Cannot determine channel context]";
        try {
            const msg = await channel.messages.fetch(messageId);
            if (!emoji) { const reactions = msg.reactions.cache; return prop === 'count' ? reactions.map(r => `${r.emoji.identifier}:${r.count}`).join(';') : reactions.map(r => r.emoji.identifier).join(';'); }
            const reaction = msg.reactions.cache.get(emoji); // May need emoji ID for custom
            if (!reaction) return "";
            if (prop === 'users') { await reaction.users.fetch(); return reaction.users.cache.map(u => u.id).join(';'); }
            return reaction.count.toString();
        } catch (e) { return `[Error fetching reactions: ${e.message}]`; }
    }
};  