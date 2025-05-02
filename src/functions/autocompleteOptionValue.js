module.exports = {
    name: "$autocompleteOptionValue", description: "Returns the current value of the focused option in an autocomplete interaction.", takesBrackets: false,
    execute: async (context, args) => { if (!context.interaction?.isAutocomplete()) return "[Error: Not an autocomplete interaction]"; return context.interaction.options.getFocused(false)?.value ?? ""; }
};