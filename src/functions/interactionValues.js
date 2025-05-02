module.exports = {
    name: "$interactionValues",
    description: "Returns the selected value(s) from a select menu interaction, joined by semicolon.",
    takesBrackets: false,
    execute: async (context, args) => {
        if (!context.interaction || !context.interaction.isAnySelectMenu()) {
             return "[Error: Not a select menu interaction context]";
        }
        return context.interaction.values?.join(';') || "";
    }
};