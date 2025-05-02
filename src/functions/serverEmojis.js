module.exports = {
    name: "$serverEmojis", description: "Returns JSON array of detailed emoji info for the guild. Args: [guildID?]", takesBrackets: true,
    execute: async (context, args) => {
        const guildId = args[0]?.trim(); let targetGuild = null; if (guildId) { try { targetGuild = await context.client.guilds.fetch(guildId); } catch { return `[Error: Guild ${guildId} not found]`; } } else { targetGuild = context.guild; } if (!targetGuild) return "[Error: Could not determine guild context]";
        try { await targetGuild.emojis.fetch(); const emojis = targetGuild.emojis.cache.map(e => ({ id: e.id, name: e.name, animated: e.animated, url: e.imageURL() })); return JSON.stringify(emojis); } catch { return "[]"; }
    }
};