module.exports = {
    name: "$deleteGuild",
    description: "Makes the bot leave a guild. If bot owns it, DELETES the guild. [DANGEROUS - OWNER ONLY]. Args: guildID",
    takesBrackets: true,
    execute: async (context, args) => {
        // SECURITY: Strongly recommend owner check ONLY
        if (!args[0]) return "[Error: Requires guildID]";
        const guildId = args[0];
        if (!/^\d{17,19}$/.test(guildId)) return "[Error: Invalid guildID format]";

        try {
            const guild = await context.client.guilds.fetch(guildId);
            if (!guild) return "[Error: Bot is not in the specified guild]";

            if (guild.ownerId === context.client.user.id) {
                console.warn(`!!! Solara: Deleting guild ${guild.name} (${guildId}) as owner via $deleteGuild !!!`);
                await guild.delete();
                return `[Guild Deleted: ${guildId}]`;
            } else {
                console.log(`Solara: Leaving guild ${guild.name} (${guildId}) via $deleteGuild.`);
                await guild.leave();
                return `[Left Guild: ${guildId}]`;
            }
        } catch (err) {
            console.error(`Error leaving/deleting guild ${guildId}:`, err);
            return `[Error: Failed to leave/delete guild ${guildId} - ${err.message}]`;
        }
    }
};