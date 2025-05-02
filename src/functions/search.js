const play = require('play-dl');
module.exports = {
    name: "$search", description: "Searches YouTube for a video. Returns JSON string of first result. Args: query", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $search requires a query]"; const query = args[0];
        try {
            const results = await play.search(query, { limit: 1, source: { youtube : "video" } });
            if (!results || results.length === 0) return "[]";
            const first = results[0];
            return JSON.stringify({
                title: first.title || "",
                url: first.url || "",
                duration: first.durationRaw || "N/A",
                thumbnail: first.thumbnails?.[0]?.url || "",
                channelName: first.channel?.name || "",
                channelUrl: first.channel?.url || ""
            });
        } catch (e) { console.error(`Search error for ${query}:`, e); return "[Error searching YouTube]"; }
    }
};