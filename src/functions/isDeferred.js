module.exports = {
    name: "$isDeferred", description: "Checks if the interaction has been deferred. Returns true or false.", takesBrackets: false,
    execute: async (context, args) => { return context.interaction?.deferred?.toString() ?? "false"; }
};