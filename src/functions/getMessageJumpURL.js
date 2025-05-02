module.exports = {
    name: "$getMessageJumpURL", description: "Returns the jump URL for a message. Args: messageID;[channelID?];[guildID?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $getMessageJumpURL requires messageID]";
        const messageId = args[0]; const channelId = args[1]?.trim() || context.channel?.id; const guildId = args[2]?.trim() || context.guild?.id;
        if (!messageId || !channelId || !guildId) return "[Error: Missing required IDs (message, channel, guild)]";
        return `https://discord.com/channels/${guildId}/${channelId}/${messageId}`;
    }
};