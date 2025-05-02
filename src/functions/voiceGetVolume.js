module.exports = {
    name: "$voiceGetVolume", description: "Gets the stored playback volume (0-200).", takesBrackets: false,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]";
        const guildVoiceState = context.client.voiceManager.get(context.guild.id);
        return guildVoiceState ? Math.round(guildVoiceState.volume * 100).toString() : "100"; // Default 100
    }
};