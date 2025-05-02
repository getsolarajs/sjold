module.exports = {
    name: "$respondAutocomplete", description: "Responds to an autocomplete interaction with choices. Args: choicesJsonString", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.interaction?.isAutocomplete()) return "[Error: Not an autocomplete interaction]";
        if (context.interaction.responded) return "[Error: Autocomplete already responded]";
        if (!args[0]) return "[Error: Requires choices JSON string]";
        try { const choices = JSON.parse(args[0]); if (!Array.isArray(choices)) return "[Error: Choices must be a JSON array]"; await context.interaction.respond(choices.slice(0, 25)); return ""; } // Limit to 25 choices
        catch (e) { if (e instanceof SyntaxError) return "[Error: Invalid JSON choices]"; console.error("Autocomplete Respond Error:", e); return `[Error: Failed to respond - ${e.message}]`; }
    }
};