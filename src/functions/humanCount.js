module.exports = {
    name: "$humanCount",
    description: "Returns the number of humans in the current guild or the guild specified by ID.",
    takesBrackets: true,
    execute: async (context, args) => {
        const guildId = args[0]?.trim();
        let targetGuild = null;
        if (guildId) {
            try {
                targetGuild = await context.client.guilds.fetch(guildId);
                 await targetGuild.members.fetch();
            } catch (e) { return `[Error: Could not find guild with ID ${guildId}]`; }
        } else {
             targetGuild = context.guild;
              if (!targetGuild) return "[Error: $humanCount requires guild context when no ID is provided]";
             if (!targetGuild.members.cache.size >= (targetGuild.memberCount || 1) * 0.9) {
                  try { await targetGuild.members.fetch(); }
                  catch(e) { console.warn(`$humanCount: Failed to fetch members: ${e.message}`); return "[Error: Failed to fetch members]"; }
             }
        }
        if (targetGuild) {
            const humanCount = targetGuild.members.cache.filter(member => !member.user.bot).size;
            return humanCount.toString();
        }
        return "[Error: $humanCount - Could not determine guild context or fetch guild by ID]";
    }
};