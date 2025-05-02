module.exports = {
    name: "$interactionCustomID",
    description: "Returns the custom ID of the component/modal interaction.",
    takesBrackets: false,
    execute: async (context, args) => {
        return context.interaction?.customId || "[Error: Not a component/modal interaction context]";
    }
};