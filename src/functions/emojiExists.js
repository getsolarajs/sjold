module.exports = {
    name: "$emojiExists",
    description: "Checks if a custom emoji exists in the current guild or globally. Args: emojiID or full custom emoji",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $emojiExists requires an emoji ID or custom emoji string]";
        const query = args[0].trim();
        let emojiId = query;
        const customMatch = query.match(/<a?:.+?:(\d{17,19})>/);
        if (customMatch) emojiId = customMatch[1];
        if (!/^\d{17,19}$/.test(emojiId)) return "false";
        if (context.client.emojis.cache.has(emojiId)) return "true";
        if (context.guild?.emojis.cache.has(emojiId)) return "true";
        try { if (context.guild) { await context.guild.emojis.fetch(emojiId); return "true"; } }
        catch(err) { if (err.code === 10014) return "false"; }
        return "false";
    }
};