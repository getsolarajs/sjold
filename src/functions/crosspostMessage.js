const { ChannelType } = require('discord.js');
module.exports = {
    name: "$crosspostMessage", description: "Publishes (crossposts) a message in an announcement channel. Args: messageID;[channelID]", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $crosspostMessage requires messageID]";
        const messageId = args[0]; const channelId = args[1]?.trim() || context.channel?.id;
        if (!channelId) return "[Error: Cannot determine channel context/ID]";
        try {
            const channel = await context.client.channels.fetch(channelId);
            if (channel?.type !== ChannelType.GuildAnnouncement) return "[Error: Channel is not an Announcement channel]";
            if (!channel.permissionsFor(context.guild?.members.me)?.has(["ViewChannel", "SendMessages", "ManageMessages"])) return "[Error: Bot lacks permissions (View, Send, Manage) in Announcement channel]";
            const message = await channel.messages.fetch(messageId);
            if (!message.crosspostable) return "[Error: Message cannot be crossposted (already published, blocked, etc.)]";
            await message.crosspost(); return "";
        } catch (err) { return `[Error crossposting: ${err.message}]`; }
    }
};