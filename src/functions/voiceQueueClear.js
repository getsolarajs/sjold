module.exports = {
    name: "$voiceQueueClear", description: "Clears the song queue.", takesBrackets: false,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]";
        const guildVoiceState = context.client.voiceManager.get(context.guild.id);
        if (guildVoiceState) { guildVoiceState.queue = []; return ""; }
        return "[Error: Bot not connected]";
    }
};