module.exports = {
    name: "$cloneEmoji", description: "Clones an emoji to the current guild. Args: emojiID or emoji;[newName];[reason]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (!args[0]) return "[Error: Requires emoji ID or string]";
        const query = args[0].trim(); let emojiId = query; const newName = args[1]; const reason = args[2];
        const customMatch = query.match(/<a?:(.*?):(\d{17,19})>/); let url; let name = newName;
        if (customMatch) { emojiId = customMatch[1]; if (!name) name = customMatch[0]; }
        if (!/^\d{17,19}$/.test(emojiId)) return "[Error: Invalid emoji ID format]";
        if (!name) return "[Error: New name required if cloning by ID only]";
        try { if (!context.guild.members.me?.permissions.has("ManageEmojisAndStickers")) return "[Error: Bot lacks Manage Emojis permission]"; const emoji = await context.client.emojis.fetch(emojiId).catch(()=>null); url = emoji?.imageURL(); if (!url) return "[Error: Could not resolve original emoji URL]"; const created = await context.guild.emojis.create({ attachment: url, name: name, reason: reason }); return created.toString(); }
        catch (e) { return `[Error cloning emoji: ${e.message}]`; }
    }
};