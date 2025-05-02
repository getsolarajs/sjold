const { ChannelType } = require('discord.js');
module.exports = {
    name: "$setChannelTopic",
    description: "Changes the topic of a text-based channel. Args: channelID;newTopic;[reason]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $setChannelTopic requires a guild context]";
        if (args.length < 2) return "[Error: $setChannelTopic requires channelID and newTopic]";
        const channelId = args[0]; const newTopic = args[1]; const reason = args.slice(2).join(';');
        try {
            if (!context.guild.members.me?.permissions.has("ManageChannels")) return "[Error: Bot lacks Manage Channels permission]";
            const channelToEdit = await context.guild.channels.fetch(channelId);
            if (!channelToEdit) return `[Error: Channel with ID ${channelId} not found]`;
            if (![ChannelType.GuildText, ChannelType.GuildAnnouncement, ChannelType.GuildForum].includes(channelToEdit.type)) return "[Error: Channel type does not support topics]";
            await channelToEdit.setTopic(newTopic, reason || "Channel topic changed via bot."); return "";
        } catch (err) { return `[Error: Failed to set topic for channel ${channelId} - ${err.message}]`; }
    }
};