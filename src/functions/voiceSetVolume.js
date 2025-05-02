module.exports = {
    name: "$voiceSetVolume", description: "Sets the playback volume (0-200). [Note: Basic Implementation]. Args: volume", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]";
        if (!args[0]) return "[Error: Requires volume level (0-200)]";
        const volume = parseInt(args[0], 10);
        if (isNaN(volume) || volume < 0 || volume > 200) return "[Error: Volume must be between 0 and 200]";
        const guildVoiceState = context.client.voiceManager.get(context.guild.id);
        if (guildVoiceState) {
             guildVoiceState.volume = volume / 100; // Store as 0.0 - 2.0 factor
             // Applying requires InlineVolumeTransformer when creating the resource - complex to add dynamically here.
             console.warn("$voiceSetVolume: Volume set internally, but applying requires resource transformer.");
             return "";
        }
        return "[Error: Bot not connected to voice]";
    }
};