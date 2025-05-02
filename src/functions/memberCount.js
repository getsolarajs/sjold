module.exports = {
    name: "$memberCount",
    description: "Returns the total member count of the current guild or the guild specified by ID.",
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
        if (targetGuild) {
            if (targetGuild.memberCount) return targetGuild.memberCount.toString();
            return targetGuild.members.cache.size.toString() + " (cached)";
        }
        return "[Error: $memberCount - Could not determine guild context or fetch guild by ID]";
    }
};