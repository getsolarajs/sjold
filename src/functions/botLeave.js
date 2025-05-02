module.exports = {
    name: "$botLeave",
    description: "Makes the bot leave the current guild or a specified guild. Args: [guildID]",
    takesBrackets: true,
    execute: async (context, args) => {
        const guildId = args[0]?.trim() || context.guild?.id;
        if (!guildId) return "[Error: Cannot determine guild context for $botLeave]";
        try {
            const guild = await context.client.guilds.fetch(guildId);
            if (!guild) return `[Error: Guild ${guildId} not found or bot not in it]`;
            await guild.leave();
            return "";
        } catch (err) {
            console.error(`Error leaving guild ${guildId}:`, err);
            return `[Error: Failed to leave guild ${guildId} - ${err.message}]`;
        }
    }
};