module.exports = {
    name: "$serverCreationDate",
    description: "Returns the timestamp (in ms) when the current guild or the guild specified by ID was created.",
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
        if (targetGuild) return targetGuild.createdTimestamp.toString();
        return "[Error: $serverCreationDate - Could not determine guild context or fetch guild by ID]";
    }
};