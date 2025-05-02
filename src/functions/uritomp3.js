module.exports = {
    name: "$uritomp3", description: "Finds the streamable URL for a search query (used with $voicePlay). Args: query", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires query]"; const query = args[0];
        try { const searchResult = await context.client.functionParser.parse(`$search[${query}]`, context); if (searchResult.startsWith('[')) return ""; const parsed = JSON.parse(searchResult); return parsed?.url || ""; }
        catch (e) { return `[Error finding URL: ${e.message}]`; }
    }
};