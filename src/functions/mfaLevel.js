const { GuildMFALevel } = require('discord.js');
module.exports = {
    name: "$mfaLevel",
    description: "Returns the MFA Level (None/Elevated) for the current guild or specified guild ID.",
    takesBrackets: true,
    execute: async (context, args) => {
        const guildId = args[0]?.trim(); let targetGuild = null;
        if (guildId) { try { targetGuild = await context.client.guilds.fetch(guildId); } catch (e) { return `[Error: Could not find guild ${guildId}]`; } }
        else { targetGuild = context.guild; }
        if (targetGuild) return GuildMFALevel[targetGuild.mfaLevel] ?? targetGuild.mfaLevel.toString();
        return "[Error: $mfaLevel - Could not determine guild context]";
    }
};