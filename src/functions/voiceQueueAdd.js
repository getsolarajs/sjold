const play = require('play-dl');
module.exports = {
    name: "$voiceQueueAdd", description: "Adds a song/URL to the queue. Args: queryOrURL", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires query or URL]"; const query = args[0];
        if (!context.guild) return "[Error: Requires guild context]";
        const guildVoiceState = context.client.voiceManager.get(context.guild.id);
        if (!guildVoiceState || !guildVoiceState.connection || guildVoiceState.connection.state.status === 'destroyed') return "[Error: Bot not connected to voice]";
        try {
            let searchResults = await play.search(query, { limit: 1 });
            if (!searchResults || searchResults.length === 0) return `[Error: No results found for "${query}"]`;
            const videoInfo = searchResults[0];
            guildVoiceState.queue.push({ url: videoInfo.url, title: videoInfo.title, duration: videoInfo.durationRaw, requestedBy: context.user.id });
            return `Added to Queue: **${videoInfo.title}** (Position: ${guildVoiceState.queue.length})`;
        } catch (e) { return `[Error adding to queue: ${e.message}]`; }
    }
};