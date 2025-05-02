module.exports = {
    name: "$isAutocomplete", description: "Checks if the interaction is an autocomplete request. Returns true or false.", takesBrackets: false,
    execute: async (context, args) => { return context.interaction?.isAutocomplete?.().toString() ?? "false"; }
};