module.exports = {
    name: "$channelURL",
    description: "Returns the URL for the current channel or specified channel ID.",
    takesBrackets: true,
    execute: async (context, args) => {
        const channelId = args[0]?.trim() || context.channel?.id;
        const guildId = context.guild?.id;
        if (!channelId) return "[Error: Could not determine channel ID]";
        if (!guildId) return "[Error: $channelURL requires a guild context]"; // URL needs guild ID
        return `https://discord.com/channels/${guildId}/${channelId}`;
    }
};