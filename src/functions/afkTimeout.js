module.exports = {
    name: "$afkTimeout",
    description: "Returns the AFK timeout (in seconds) for the current guild or specified guild ID.",
    takesBrackets: true,
    execute: async (context, args) => {
        const guildId = args[0]?.trim(); let targetGuild = null;
        if (guildId) { try { targetGuild = await context.client.guilds.fetch(guildId); } catch (e) { return `[Error: Could not find guild ${guildId}]`; } }
        else { targetGuild = context.guild; }
        if (targetGuild) return targetGuild.afkTimeout?.toString() ?? "0";
        return "[Error: $afkTimeout - Could not determine guild context]";
    }
};