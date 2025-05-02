const { PermissionsBitField } = require('discord.js');
module.exports = {
    name: "$getChannelBotPerms",
    description: "Returns semicolon-separated list of the bot's permissions in the current channel or specified channel ID.",
    takesBrackets: true,
    execute: async (context, args) => {
        const channelId = args[0]?.trim() || context.channel?.id;
        if (!channelId) return "[Error: $getChannelBotPerms requires a channel context or channelID]";
        if (!context.guild) return "[Error: $getChannelBotPerms requires a guild context]";
        try {
            const channel = await context.client.channels.fetch(channelId);
            if (!channel || !channel.guild) return "[Error: Channel not found or not in a guild]";
            const botMember = context.guild.members.me; 
            if (!botMember) return "[Error: Could not find bot member in guild]";
            const perms = botMember.permissionsIn(channel);
            if (!perms) return "[Error: Could not calculate permissions]";
            return perms.toArray().join(';');
        } catch (err) { return `[Error: Failed to get permissions for channel ${channelId} - ${err.message}]`; }
    }
};