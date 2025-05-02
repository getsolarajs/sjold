const { ChannelType } = require('discord.js');
module.exports = {
    name: "$categoryCount",
    description: "Returns the total number of category channels in the current guild or the guild specified by ID.",
    takesBrackets: true,
    execute: async (context, args) => {
        const guildId = args[0]?.trim();
        let targetGuild = null;
        if (guildId) {
            try {
                targetGuild = await context.client.guilds.fetch(guildId);
                 await targetGuild.channels.fetch();
            } catch (e) { return `[Error: Could not find guild with ID ${guildId}]`; }
        } else {
             targetGuild = context.guild;
              if (!targetGuild) return "[Error: $categoryCount requires guild context when no ID provided]";
              try { await targetGuild.channels.fetch(); }
              catch(e) { console.warn(`$categoryCount: Failed to fetch channels: ${e.message}`); return "[Error: Failed to fetch channels]"; }
        }
        if (targetGuild) {
            const categoryCount = targetGuild.channels.cache.filter(c => c.type === ChannelType.GuildCategory).size;
            return categoryCount.toString();
        }
        return "[Error: $categoryCount - Could not determine guild context or fetch guild by ID]";
    }
};