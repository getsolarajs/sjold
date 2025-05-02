module.exports = {
    name: "$voiceQueueRemove", description: "Removes a song from the queue by index (1-based). Args: index", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (!args[0]) return "[Error: Requires queue index]";
        const index = parseInt(args[0], 10); if (isNaN(index) || index < 1) return "[Error: Invalid index]";
        const guildVoiceState = context.client.voiceManager.get(context.guild.id);
        if (!guildVoiceState || guildVoiceState.queue.length === 0) return "[Error: Queue is empty or bot not connected]";
        if (index > guildVoiceState.queue.length) return `[Error: Index out of bounds (Queue size: ${guildVoiceState.queue.length})]`;
        const removed = guildVoiceState.queue.splice(index - 1, 1);
        return `Removed: **${removed[0]?.title || 'Unknown'}**`;
    }
};