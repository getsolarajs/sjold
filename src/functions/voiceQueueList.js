module.exports = {
    name: "$voiceQueueList", description: "Returns the current queue (limited length). Args: [limit=10];[separator=\\n]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]";
        const limit = args[0] ? parseInt(args[0], 10) : 10;
        const separator = args[1] !== undefined ? args[1].replace(/\\n/g, '\n') : '\n'; // Allow \n for newline
        if (isNaN(limit) || limit < 1) return "[Error: Invalid limit]";
        const guildVoiceState = context.client.voiceManager.get(context.guild.id);
        if (!guildVoiceState || guildVoiceState.queue.length === 0) return "Queue is empty.";
        return guildVoiceState.queue.slice(0, limit).map((song, i) => `${i + 1}. ${song.title} (${song.duration})`).join(separator);
    }
};