module.exports = {
    name: "$isSelectMenuInteraction", description: "Checks if the interaction is any select menu type. Returns true or false.", takesBrackets: false,
    execute: async (context, args) => { return context.interaction?.isAnySelectMenu?.().toString() ?? "false"; }
};