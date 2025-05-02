const { getVoiceConnection } = require('@discordjs/voice');
module.exports = {
    name: "$isVoiceConnected", description: "Checks if the bot is connected to voice in the current guild.", takesBrackets: false,
    execute: async (context, args) => { if (!context.guild) return "false"; return (!!getVoiceConnection(context.guild.id)).toString(); }
};