module.exports = {
    name: "$emojiList",
    description: "Returns a semicolon-separated list of emoji IDs from the current guild.",
    takesBrackets: false,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $emojiList requires a guild context]";
        try {
            await context.guild.emojis.fetch();
            return context.guild.emojis.cache.map(e => e.id).join(';');
        } catch(e) { return "[Error: Failed to fetch emojis]"; }
    }
};