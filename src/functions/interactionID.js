module.exports = {
    name: "$interactionID",
    description: "Returns the ID of the interaction.",
    takesBrackets: false,
    execute: async (context, args) => {
        return context.interaction?.id || "[Error: Not an interaction context]";
    }
};