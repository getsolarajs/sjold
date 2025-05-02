module.exports = {
    name: "$serverRoles", description: "Returns JSON array of detailed role info for the guild. Args: [guildID?]", takesBrackets: true,
    execute: async (context, args) => {
        const guildId = args[0]?.trim(); let targetGuild = null; if (guildId) { try { targetGuild = await context.client.guilds.fetch(guildId); } catch { return `[Error: Guild ${guildId} not found]`; } } else { targetGuild = context.guild; } if (!targetGuild) return "[Error: Could not determine guild context]";
        try { await targetGuild.roles.fetch(); const roles = targetGuild.roles.cache.map(r => ({ id: r.id, name: r.name, color: r.hexColor, position: r.position, hoist: r.hoist, managed: r.managed })); return JSON.stringify(roles); } catch { return "[]"; }
    }
};