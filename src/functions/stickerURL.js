module.exports = {
    name: "$stickerURL",
    description: "Returns the URL for a sticker. Args: stickerID",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $stickerURL requires sticker ID]";
        const stickerId = args[0].trim();
        if (!/^\d{17,19}$/.test(stickerId)) return "[Error: Invalid sticker ID format]";
        try {
             let sticker = context.client.stickers.cache.get(stickerId);
             if (!sticker && context.guild) sticker = await context.guild.stickers.fetch(stickerId).catch(() => null);
             return sticker?.url || "";
        } catch (e) { return "[Error fetching sticker]"; }
    }
};