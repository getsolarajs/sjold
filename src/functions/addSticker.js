const { StickerFormatType } = require('discord.js');
module.exports = {
    name: "$addSticker", description: "Adds a sticker to the current guild. Args: fileURLorPath;name;tags;[description?];[reason?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (args.length < 3) return "[Error: Requires file, name, and tags]";
        const file = args[0]; const name = args[1]; const tags = args[2]; const description = args[3] || ''; const reason = args[4];
        if (!name || name.length < 2 || name.length > 30) return "[Error: Invalid sticker name (2-30 chars)]";
        if (!tags || tags.length === 0 || tags.length > 200) return "[Error: Tags required (1-200 chars total)]"; // Tags are mandatory
        try { if (!context.guild.members.me?.permissions.has("ManageEmojisAndStickers")) return "[Error: Bot lacks Manage Stickers permission]"; const sticker = await context.guild.stickers.create({ file: file, name: name, tags: tags, description: description, reason: reason || "Sticker added via bot" }); return sticker.id; }
        catch (e) { return `[Error adding sticker: ${e.message}]`; }
    }
};