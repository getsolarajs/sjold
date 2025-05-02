module.exports = {
    name: "$afkChannelID",
    description: "Returns the AFK channel ID for the current guild or specified guild ID.",
    takesBrackets: true,
    execute: async (context, args) => {
        const guildId = args[0]?.trim(); let targetGuild = null;
        if (guildId) { try { targetGuild = await context.client.guilds.fetch(guildId); } catch (e) { return `[Error: Could not find guild ${guildId}]`; } }
        else { targetGuild = context.guild; }
        if (targetGuild) return targetGuild.afkChannelId || "";
        return "[Error: $afkChannelID - Could not determine guild context]";
    }
};