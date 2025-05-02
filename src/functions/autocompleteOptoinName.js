module.exports = {
    name: "$autocompleteOptionName", description: "Returns the name of the focused option in an autocomplete interaction.", takesBrackets: false,
    execute: async (context, args) => { if (!context.interaction?.isAutocomplete()) return "[Error: Not an autocomplete interaction]"; return context.interaction.options.getFocused(false)?.name ?? ""; }
};