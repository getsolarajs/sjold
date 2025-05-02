module.exports = {
    name: "$deleteEmoji", description: "Deletes an emoji from the current guild. Args: emojiID;[reason]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (!args[0]) return "[Error: Requires emoji ID]";
        const emojiId = args[0]; const reason = args[1];
        try { if (!context.guild.members.me?.permissions.has("ManageEmojisAndStickers")) return "[Error: Bot lacks Manage Emojis permission]"; const emoji = await context.guild.emojis.fetch(emojiId); if (!emoji) return "[Error: Emoji not found]"; await emoji.delete(reason || "Emoji deleted via bot"); return ""; }
        catch (e) { if (e.code === 10014) return "[Error: Emoji not found]"; return `[Error deleting emoji: ${e.message}]`; }
    }
};