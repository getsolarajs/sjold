module.exports = {
    name: "$deleteSticker", description: "Deletes a guild sticker. Args: stickerID;[reason]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (!args[0]) return "[Error: Requires stickerID]";
        const stickerId = args[0]; const reason = args[1];
        try { if (!context.guild.members.me?.permissions.has("ManageEmojisAndStickers")) return "[Error: Bot lacks Manage Stickers permission]"; const sticker = await context.guild.stickers.fetch(stickerId); if (!sticker) return "[Error: Sticker not found]"; await sticker.delete(reason); return ""; }
        catch (e) { return `[Error deleting sticker: ${e.message}]`; }
    }
};