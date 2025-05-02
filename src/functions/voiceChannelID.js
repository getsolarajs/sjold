const { getVoiceConnection } = require('@discordjs/voice');
module.exports = {
    name: "$voiceChannelID", description: "Returns the ID of the voice channel the bot is connected to in the current guild.", takesBrackets: false,
    execute: async (context, args) => { if (!context.guild) return ""; return getVoiceConnection(context.guild.id)?.joinConfig?.channelId || ""; }
};