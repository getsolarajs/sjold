module.exports = {
    name: "$interactionUserID",
    description: "Returns the user ID who triggered the interaction.",
    takesBrackets: false,
    execute: async (context, args) => {
        return context.interaction?.user?.id || "[Error: Not an interaction context]";
    }
};