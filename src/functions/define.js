const axios = require('axios');
module.exports = {
    name: "$define", description: "Gets the definition of a word using dictionaryapi.dev. Args: word", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires a word to define]"; const word = encodeURIComponent(args[0]);
        try {
            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, { timeout: 4000 });
            const data = response.data?.[0]; 
            const meaning = data?.meanings?.[0];
            const definition = meaning?.definitions?.[0]?.definition;
            const partOfSpeech = meaning?.partOfSpeech;
            if (definition) return `**${data.word}** (${partOfSpeech}): ${definition}`;
            return `[Error: No definition found for "${args[0]}"]`;
        } catch (error) {
            if (error.response?.status === 404) return `[Error: No definition found for "${args[0]}"]`;
            console.error(`Define error for ${args[0]}:`, error.message); return "[Error fetching definition]";
        }
    }
};