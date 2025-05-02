module.exports = {
    name: "$modifySticker", description: "Modifies a guild sticker. Args: stickerID;optionsJson;[reason]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (args.length < 2) return "[Error: Requires stickerID and optionsJson]";
        const stickerId = args[0]; const optionsJson = args[1]; const reason = args[2]; let options;
        try { options = JSON.parse(optionsJson); } catch { return "[Error: Invalid options JSON]"; }
        try { if (!context.guild.members.me?.permissions.has("ManageEmojisAndStickers")) return "[Error: Bot lacks Manage Stickers permission]"; const sticker = await context.guild.stickers.fetch(stickerId); if (!sticker) return "[Error: Sticker not found]"; const modified = await sticker.edit(options, reason); return modified.id; }
        catch (e) { return `[Error modifying sticker: ${e.message}]`; }
    }
};