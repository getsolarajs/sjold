module.exports = {
    name: "$setEmbedJSON", description: "Replaces the current embed data with data from a JSON string.", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $setEmbedJSON requires a JSON string]";
        try { const embedData = JSON.parse(args[0]); context.embedData = embedData; return ""; } // Overwrite existing data
        catch (e) { return `[Error: Invalid JSON for embed: ${e.message}]`; }
    }
};