module.exports = {
    name: "$randomUserID",
    description: "Returns a random user ID from the current guild or specified guild ID. Excludes bots by default. Args: [guildID];[includeBots=false]",
    takesBrackets: true,
    execute: async (context, args) => {
        const guildId = args[0]?.trim();
        const includeBots = (args[1]?.trim().toLowerCase() === 'true');
        let targetGuild = null;
        if (guildId && /^\d{17,19}$/.test(guildId)) {
            try { targetGuild = await context.client.guilds.fetch(guildId); }
            catch (e) { return `[Error: Could not find guild with ID ${guildId}]`; }
        } else { targetGuild = context.guild; }
        if (!targetGuild) return "[Error: $randomUserID - Could not determine guild context]";
        try {
            let cacheSufficient = targetGuild.members.cache.size >= (targetGuild.memberCount || 1) * 0.8;
            if (!cacheSufficient) {
                 try { await targetGuild.members.fetch(); }
                 catch(e) { console.warn(`$randomUserID: Failed to fetch members: ${e.message}`); return "[Error: Failed to fetch members]"; }
            }
            let memberPool = targetGuild.members.cache;
            if (!includeBots) memberPool = memberPool.filter(member => !member.user.bot);
            if (memberPool.size === 0) return "[Error: No suitable users found in the guild matching criteria]";
            const randomMember = memberPool.random();
            return randomMember.id;
        } catch (fetchError) { return "[Error: Failed to fetch/process guild members]"; }
    }
};