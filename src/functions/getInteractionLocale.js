module.exports = {
    name: "$getInteractionLocale", description: "Returns the locale of the interaction.", takesBrackets: false,
    execute: async (context, args) => { return context.interaction?.locale ?? "[Error: Not an interaction context]"; }
};