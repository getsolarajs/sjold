module.exports = {
    name: "$guildOwner", description: "Returns JSON string of guild owner User object. Args: [guildID?]", takesBrackets: true,
    execute: async (context, args) => {
        const guildId = args[0]?.trim(); let targetGuild = null; if (guildId) { try { targetGuild = await context.client.guilds.fetch(guildId); } catch { return `[Error: Guild ${guildId} not found]`; } } else { targetGuild = context.guild; } if (!targetGuild) return "[Error: Could not determine guild context]";
        try { const owner = await targetGuild.fetchOwner(); return JSON.stringify(owner.user); } catch { return "[Error fetching owner]"; }
    }
};