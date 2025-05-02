module.exports = {
    name: "$getEmoji",
    description: "Returns the custom emoji string (<:name:id> or <a:name:id>) if found. Args: emojiName or emojiID",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $getEmoji requires an emoji name or ID]";
        const query = args[0].trim();
        let foundEmoji = null;
        if (/^\d{17,19}$/.test(query)) {
             foundEmoji = context.client.emojis.cache.get(query) || context.guild?.emojis.cache.get(query);
             if (!foundEmoji && context.guild) {
                  try { foundEmoji = await context.guild.emojis.fetch(query); } catch { /* ignore */ }
             }
        }
        if (!foundEmoji && context.guild) {
             const lowerQuery = query.toLowerCase();
             foundEmoji = context.guild.emojis.cache.find(e => e.name.toLowerCase() === lowerQuery);
        }
        if (!foundEmoji) {
             const lowerQuery = query.toLowerCase();
             foundEmoji = context.client.emojis.cache.find(e => e.name.toLowerCase() === lowerQuery);
        }
        if (foundEmoji) return foundEmoji.toString();
        return `[Error: Could not find emoji matching "${query}"]`;
    }
};