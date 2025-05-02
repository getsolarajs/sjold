const { ChannelType } = require('discord.js');
module.exports = {
    name: "$setSlowmode",
    description: "Sets the slowmode delay (in seconds) for a channel. Args: seconds;[channelID];[reason]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args[0] === undefined) return "[Error: $setSlowmode requires seconds]";
        const seconds = parseInt(args[0], 10);
        const channelId = args[1]?.trim() || context.channel?.id;
        const reason = args.slice(2).join(';');
        if (isNaN(seconds) || seconds < 0 || seconds > 21600) return "[Error: Invalid seconds for $setSlowmode (must be 0-21600)]";
        if (!channelId) return "[Error: Cannot determine channel context for $setSlowmode]";
        try {
            if (!context.guild?.members.me?.permissions.has("ManageChannels")) return "[Error: Bot lacks Manage Channels permission]";
            const channel = await context.client.channels.fetch(channelId);
            if (!channel) return `[Error: Channel with ID ${channelId} not found]`;
            if (![ChannelType.GuildText, ChannelType.GuildAnnouncement, ChannelType.GuildForum, ChannelType.GuildVoice, ChannelType.GuildStageVoice].includes(channel.type)) return "[Error: Channel type does not support slowmode]";
            await channel.setRateLimitPerUser(seconds, reason || "Slowmode set via bot."); return "";
        } catch (err) { return `[Error: Failed to set slowmode for channel ${channelId} - ${err.message}]`; }
    }
};