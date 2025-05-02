module.exports = {
    name: "$voiceLoop", description: "Sets loop mode (none/track/queue). Args: [mode=none]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]";
        const mode = args[0]?.toLowerCase() || 'none';
        if (!['none', 'track', 'queue'].includes(mode)) return "[Error: Invalid loop mode (none/track/queue)]";
        const guildVoiceState = context.client.voiceManager.get(context.guild.id);
        if (guildVoiceState) { guildVoiceState.loopMode = mode; return `Loop mode set to: ${mode}`; }
        return "[Error: Bot not connected]";
    }
};