const { ChannelType } = require('discord.js');
module.exports = {
    name: "$createThread",
    description: "Creates a thread in the current or specified channel. Args: name;[startMessageID];[type=Public];[autoArchiveDuration=Max];[reason]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $createThread requires a thread name]";
        const name = args[0];
        const startMessageId = args[1]?.trim();
        const typeStr = args[2]?.trim().toLowerCase() || 'public';
        const durationStr = args[3]?.trim().toLowerCase() || 'max';
        const reason = args.slice(4).join(';');

        const channel = context.channel;
        if (!channel || !channel.isTextBased() || channel.isDMBased()) return "[Error: $createThread requires a guild text-based channel context]";

        let type;
        if (typeStr === 'public') type = ChannelType.PublicThread;
        else if (typeStr === 'private') type = ChannelType.PrivateThread;
        else if (typeStr === 'news') type = ChannelType.AnnouncementThread;
        else return "[Error: Invalid thread type (Public/Private/News)]";

        let autoArchiveDuration = 'Maximum'; 
        if (durationStr !== 'max') {
            const durationMinutes = parseInt(durationStr, 10);
            if (isNaN(durationMinutes) || ![60, 1440, 4320, 10080].includes(durationMinutes)) {
                 return "[Error: Invalid autoArchiveDuration (use 60, 1440, 4320, 10080, or max)]";
            }
             autoArchiveDuration = durationMinutes;
        }

        const options = { name, autoArchiveDuration, reason: reason || "Thread created via bot." };
        if (type !== ChannelType.PublicThread) options.type = type;

        try {
            let thread;
            if (startMessageId && /^\d{17,19}$/.test(startMessageId)) {
                 if (!channel.threads) return "[Error: Cannot create thread from message in this channel type]";
                 const startMessage = await channel.messages.fetch(startMessageId);
                 if (!startMessage) return `[Error: Start message ${startMessageId} not found]`;
                 if (type === ChannelType.PrivateThread && !startMessage.channel.permissionsFor(context.guild.members.me)?.has("CreatePrivateThreads")) return "[Error: Bot lacks Create Private Threads permission]";
                 if (type !== ChannelType.PrivateThread && !startMessage.channel.permissionsFor(context.guild.members.me)?.has("CreatePublicThreads")) return "[Error: Bot lacks Create Public Threads permission]";

                 thread = await startMessage.startThread(options);
            } else {
                 if (!channel.threads) return "[Error: Cannot create standalone thread in this channel type]";
                  if (type === ChannelType.PrivateThread && !channel.permissionsFor(context.guild.members.me)?.has("CreatePrivateThreads")) return "[Error: Bot lacks Create Private Threads permission]";
                 if (type !== ChannelType.PrivateThread && !channel.permissionsFor(context.guild.members.me)?.has("CreatePublicThreads")) return "[Error: Bot lacks Create Public Threads permission]";

                 thread = await channel.threads.create(options);
            }
            return thread.id;
        } catch (err) {
            console.error("Error in $createThread:", err);
            return `[Error: Failed to create thread - ${err.message}]`;
        }
    }
};