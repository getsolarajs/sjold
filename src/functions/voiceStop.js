module.exports = {
    name: "$voiceStop", description: "Stops playback and clears the queue.", takesBrackets: false,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]";
        const guildVoiceState = context.client.voiceManager.get(context.guild.id);
        if (guildVoiceState?.player) {
            guildVoiceState.player.stop(true); // true = force stop even if transitioning
            guildVoiceState.queue = []; // Clear queue
            guildVoiceState.nowPlaying = null;
             guildVoiceState.connection?.destroy(); context.client.voiceManager.delete(context.guild.id);
            return "";
        }
        return "[Error: Player not found]";
    }
};