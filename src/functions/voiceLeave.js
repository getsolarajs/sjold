const { getVoiceConnection } = require('@discordjs/voice');
module.exports = {
    name: "$voiceLeave", description: "Makes the bot leave its current voice channel in the guild.", takesBrackets: false,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]";
        const connection = getVoiceConnection(context.guild.id);
        if (connection) { connection.destroy(); context.client.voiceConnections?.delete(context.guild.id); return ""; }
        return "[Info: Bot is not in a voice channel]";
    }
};