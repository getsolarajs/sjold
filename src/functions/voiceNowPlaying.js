module.exports = {
    name: "$voiceNowPlaying", description: "Returns the title of the currently playing song.", takesBrackets: false,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]";
        const guildVoiceState = context.client.voiceManager.get(context.guild.id);
        return guildVoiceState?.nowPlaying || "Nothing is playing.";
    }
};