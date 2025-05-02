module.exports = {
    name: "$clearReactions", description: "Removes all reactions or a specific emoji's reactions from a message. Args: messageID;[emoji]", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $clearReactions requires messageID]";
        const messageId = args[0]; const emoji = args[1]?.trim();
        const channel = context.channel; if (!channel) return "[Error: Cannot determine channel context]";
        try {
            if (!channel.permissionsFor(context.guild?.members.me)?.has("ManageMessages")) return "[Error: Bot lacks Manage Messages permission]";
            const message = await channel.messages.fetch(messageId);
            if (emoji) { const reaction = message.reactions.cache.get(emoji); if (reaction) await reaction.remove(); }
            else { await message.reactions.removeAll(); }
            return "";
        } catch (err) { return `[Error clearing reactions: ${err.message}]`; }
    }
};