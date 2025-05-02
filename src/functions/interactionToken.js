module.exports = {
    name: "$interactionToken",
    description: "Returns the token of the interaction.",
    takesBrackets: false,
    execute: async (context, args) => {
        return context.interaction?.token || "[Error: Not an interaction context]";
    }
};