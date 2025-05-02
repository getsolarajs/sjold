module.exports = {
    name: "$emojiURL",
    description: "Returns the image URL for a custom emoji. Args: emojiID or full emoji",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $emojiURL requires emoji ID or emoji string]";
        const query = args[0].trim(); let emojiId = query;
        const customMatch = query.match(/<a?:.+?:(\d{17,19})>/);
        if (customMatch) emojiId = customMatch[1];
        if (!/^\d{17,19}$/.test(emojiId)) return "[Error: Invalid emoji ID format]";
        const emoji = context.client.emojis.cache.get(emojiId);
        return emoji?.imageURL() || ""; 
    }
};