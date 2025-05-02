const { GuildVerificationLevel } = require('discord.js');
module.exports = {
    name: "$serverVerificationLevel",
    description: "Returns the verification level (None, Low, Medium, High, VeryHigh) of the current guild or specified guild ID.",
    takesBrackets: true,
    execute: async (context, args) => {
        const guildId = args[0]?.trim();
        let targetGuild = null;
        if (guildId) {
            try { targetGuild = await context.client.guilds.fetch(guildId); }
            catch (e) { return `[Error: Could not find guild with ID ${guildId}]`; }
        } else {
            targetGuild = context.guild;
        }
        if (targetGuild) return GuildVerificationLevel[targetGuild.verificationLevel] ?? targetGuild.verificationLevel.toString();
        return "[Error: $serverVerificationLevel - Could not determine guild context or fetch guild by ID]";
    }
};