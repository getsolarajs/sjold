const { ChannelType } = require('discord.js');
module.exports = {
    name: "$createChannel", description: "Creates a channel in the current guild. Args: name;[type=Text];[parentID?];[reason?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (!args[0]) return "[Error: Requires a channel name]";
        const name = args[0]; const typeArg = args[1]?.trim().toLowerCase(); const parentId = args[2]?.trim(); const reason = args.slice(3).join(';');
        let type = ChannelType.GuildText;
        if (typeArg) {
             switch(typeArg) {
                 case 'text': type = ChannelType.GuildText; break; case 'voice': type = ChannelType.GuildVoice; break; case 'category': type = ChannelType.GuildCategory; break;
                 case 'news': case 'announcement': type = ChannelType.GuildAnnouncement; break; case 'stage': type = ChannelType.GuildStageVoice; break; case 'forum': type = ChannelType.GuildForum; break;
                 default: return `[Error: Invalid channel type "${args[1]}"]`;
             }
        }
        try {
             if (!context.guild.members.me?.permissions.has("ManageChannels")) return "[Error: Bot lacks Manage Channels permission]";
             const options = { type: type, reason: reason || "Channel created via bot." };
             if (parentId && /^\d{17,19}$/.test(parentId)) options.parent = parentId;
             const newChannel = await context.guild.channels.create({ name: name, ...options });
             return newChannel.id;
        } catch (err) { return `[Error creating channel: ${err.message}]`; }
    }
};