module.exports = {
    name: "$isReplied", description: "Checks if the interaction has been replied to (or deferred). Returns true or false.", takesBrackets: false,
    execute: async (context, args) => { return (context.interaction?.replied || context.interaction?.deferred)?.toString() ?? "false"; }
};