module.exports = {
    name: "$addEmoji", description: "Adds an emoji to the current guild. Args: imageURL;name;[reason]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (args.length < 2) return "[Error: Requires imageURL and name]";
        const url = args[0]; const name = args[1]; const reason = args[2];
        if (!name || name.length < 2 || name.length > 32) return "[Error: Invalid emoji name (2-32 chars)]";
        try { if (!context.guild.members.me?.permissions.has("ManageEmojisAndStickers")) return "[Error: Bot lacks Manage Emojis permission]"; const created = await context.guild.emojis.create({ attachment: url, name: name, reason: reason || "Emoji added via bot" }); return created.toString(); }
        catch (e) { return `[Error adding emoji: ${e.message}]`; }
    }
};