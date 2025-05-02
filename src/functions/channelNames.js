const { ChannelType } = require('discord.js');
module.exports = {
    name: "$channelNames",
    description: "Returns a semicolon-separated list of channel names in the current guild. Args: [type=text/voice/category/any]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $channelNames requires a guild context]";
        const typeFilter = args[0]?.toLowerCase();
        let targetType = null;
        if (typeFilter) {
             switch(typeFilter) {
                 case 'text': targetType = ChannelType.GuildText; break; case 'voice': targetType = ChannelType.GuildVoice; break;
                 case 'category': targetType = ChannelType.GuildCategory; break; case 'news': targetType = ChannelType.GuildAnnouncement; break;
                 case 'stage': targetType = ChannelType.GuildStageVoice; break; case 'forum': targetType = ChannelType.GuildForum; break;
                 case 'any': break;
                 default: return `[Error: Invalid channel type filter "${args[0]}"]`;
             }
        }
        try {
            await context.guild.channels.fetch();
            const channels = context.guild.channels.cache;
            const filtered = targetType ? channels.filter(c => c.type === targetType) : channels;
            return filtered.map(c => c.name).join(';');
        } catch (e) { return "[Error: Failed to fetch channels]"; }
    }
};