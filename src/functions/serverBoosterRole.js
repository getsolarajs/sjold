module.exports = {
    name: "$serverBoosterRole",
    description: "Returns the ID of the booster role for the current guild or the guild specified by ID.",
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
        if (targetGuild) return targetGuild.premiumSubscriberRole?.id || "";
        return "[Error: $serverBoosterRole - Could not determine guild context or fetch guild by ID]";
    }
};