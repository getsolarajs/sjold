module.exports = {
    name: "$voiceResume", description: "Resumes paused audio playback.", takesBrackets: false,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]";
        const guildVoiceState = context.client.voiceManager.get(context.guild.id);
        if (guildVoiceState?.player && guildVoiceState.player.state.status === 'paused') { guildVoiceState.player.unpause(); return ""; }
        return "[Error: Player not found or not paused]";
    }
};