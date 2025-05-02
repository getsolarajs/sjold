module.exports = {
    name: "$isEphemeral",
    description: "Checks if the interaction was deferred ephemerally (or marked via $ephemeral).",
    takesBrackets: false,
    execute: async (context, args) => {
        return (context.interaction?.deferred && context.interaction.ephemeral).toString();
    }
};