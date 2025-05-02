module.exports = {
    name: "$voicePause", description: "Pauses the current audio playback.", takesBrackets: false,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]";
        const guildVoiceState = context.client.voiceManager.get(context.guild.id);
        if (guildVoiceState?.player && guildVoiceState.player.state.status === 'playing') { guildVoiceState.player.pause(); return ""; }
        return "[Error: Player not found or not playing]";
    }
};