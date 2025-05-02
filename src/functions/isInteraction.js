module.exports = {
    name: "$isInteraction",
    description: "Returns true if the command context is an interaction, false otherwise.",
    takesBrackets: false,
    execute: async (context, args) => {
        return (!!context.interaction).toString();
    }
};