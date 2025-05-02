module.exports = {
    name: "$systemChannel",
    description: "Returns the ID of the system channel for the current guild or the guild specified by ID.",
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
        if (targetGuild) return targetGuild.systemChannelId || "";
        return "[Error: $systemChannel - Could not determine guild context or fetch guild by ID]";
    }
};