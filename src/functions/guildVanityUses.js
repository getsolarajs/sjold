module.exports = {
    name: "$guildVanityUses", description: "Alias for $getGuildVanityUses.", takesBrackets: true,
    execute: async (context, args) => {
        const guildId = args[0]?.trim(); let targetGuild = null; if (guildId) { try { targetGuild = await context.client.guilds.fetch(guildId); } catch { return `[Error: Guild ${guildId} not found]`; } } else { targetGuild = context.guild; }
        if (targetGuild) { try { if (!targetGuild.vanityURLCode) return "0"; if (!targetGuild.members.me?.permissions.has('ManageGuild')) return "[Error: Bot needs Manage Guild perm]"; const invite = await targetGuild.fetchVanityData(); return invite?.uses?.toString() ?? "0"; } catch { return "[Error fetching vanity uses]"; } }
        return "[Error: Could not determine guild]";
    }
};