const { getLyrics } = require('genius-lyrics-api');

module.exports = {
    name: "$lyrics",
    description: "Fetches lyrics for a song using Genius. Args: geniusApiKey;songTitle;artist",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0] || !args[1]) {
            return "[Error: $lyrics requires at least an API Key and a song title. Format: geniusApiKey;songTitle;artist]";
        }

        const geniusApiKey = args[0].trim();
        const title = args[1].trim();
        const artist = args[2]?.trim() || "";

        if (!geniusApiKey) {
             return "[Error: Genius API Key (first argument) is missing.]";
        }
         if (!title) {
             return "[Error: Song title (second argument) is missing.]";
        }
        if (!artist) {
            return "[Error: Song artist (third argument) is missing.]";
       }

        const options = {
            apiKey: geniusApiKey,
            title: title,
            artist: artist,
            optimizeQuery: true
        };

        try {
            console.log(`Searching lyrics with provided key for Title: "${options.title}", Artist: "${options.artist}"`);
            const lyrics = await getLyrics(options);

            if (!lyrics) {
                console.log(`No lyrics found using provided key for Title: "${options.title}", Artist: "${options.artist}"`);
                return `[Error: No lyrics found for "${title}${artist ? ` by ${artist}` : ''}"]`;
            }

            const maxLength = 4096;
             if (lyrics.length <= maxLength) {
                 return lyrics;
             } else {
                 let truncatedLyrics = lyrics.slice(0, maxLength - 4);
                 const lastNewline = truncatedLyrics.lastIndexOf('\n');
                 if (lastNewline > maxLength * 0.8) {
                     truncatedLyrics = truncatedLyrics.slice(0, lastNewline);
                 }
                 return truncatedLyrics + "\n...";
             }

        } catch (e) {
            console.error(`Genius lyrics fetch error for Title: "${options.title}", Artist: "${options.artist}":`, e);
             const errorMessage = e.message && e.message.includes('403') ? "Invalid Genius API Key provided?" :
                                e.message && e.message.includes('404') ? "Song not found on Genius." :
                                e.message ? e.message : "Could not fetch lyrics.";
            return `[Error: ${errorMessage}]`;
        }
    }
};