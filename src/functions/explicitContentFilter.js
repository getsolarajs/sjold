const { GuildExplicitContentFilter } = require('discord.js');
module.exports = {
    name: "$explicitContentFilter",
    description: "Returns the explicit content filter level for the current guild or specified guild ID.",
    takesBrackets: true,
    execute: async (context, args) => {
        const guildId = args[0]?.trim(); let targetGuild = null;
        if (guildId) { try { targetGuild = await context.client.guilds.fetch(guildId); } catch (e) { return `[Error: Could not find guild ${guildId}]`; } }
        else { targetGuild = context.guild; }
        if (targetGuild) return GuildExplicitContentFilter[targetGuild.explicitContentFilter] ?? targetGuild.explicitContentFilter.toString();
        return "[Error: $explicitContentFilter - Could not determine guild context]";
    }
};