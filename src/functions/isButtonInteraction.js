module.exports = {
    name: "$isButtonInteraction", description: "Checks if the interaction is a button click. Returns true or false.", takesBrackets: false,
    execute: async (context, args) => { return context.interaction?.isButton?.().toString() ?? "false"; }
};