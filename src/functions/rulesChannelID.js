module.exports = {
    name: "$rulesChannelID",
    description: "Returns the rules channel ID for the current guild or specified guild ID.",
    takesBrackets: true,
    execute: async (context, args) => {
        const guildId = args[0]?.trim(); let targetGuild = null;
        if (guildId) { try { targetGuild = await context.client.guilds.fetch(guildId); } catch (e) { return `[Error: Could not find guild ${guildId}]`; } }
        else { targetGuild = context.guild; }
        if (targetGuild) return targetGuild.rulesChannelId || "";
        return "[Error: $rulesChannelID - Could not determine guild context]";
    }
};