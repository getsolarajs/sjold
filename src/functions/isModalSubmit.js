module.exports = {
    name: "$isModalSubmit", description: "Checks if the interaction is a modal submission. Returns true or false.", takesBrackets: false,
    execute: async (context, args) => { return context.interaction?.isModalSubmit?.().toString() ?? "false"; }
};