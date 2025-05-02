const { joinVoiceChannel } = require('@discordjs/voice');
module.exports = {
    name: "$voiceJoin", description: "Makes the bot join the user's current voice channel or a specified channel. Args: [channelID]", takesBrackets: true,
    execute: async (context, args) => {
        const channelId = args[0]?.trim() || context.member?.voice?.channelId;
        if (!channelId) return "[Error: User not in a voice channel and no channel ID provided]";
        if (!context.guild) return "[Error: Requires guild context]";
        try { const channel = await context.client.channels.fetch(channelId); if (!channel || !channel.isVoiceBased()) return "[Error: Invalid or non-voice channel ID]"; if (!channel.joinable) return "[Error: Bot cannot join this voice channel]"; const connection = joinVoiceChannel({ channelId: channel.id, guildId: context.guild.id, adapterCreator: context.guild.voiceAdapterCreator }); context.client.voiceConnections = context.client.voiceConnections || new Map(); context.client.voiceConnections.set(context.guild.id, connection); return ""; }
        catch (e) { return `[Error joining voice channel: ${e.message}]`; }
    }
};