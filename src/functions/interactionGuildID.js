module.exports = {
    name: "$interactionGuildID",
    description: "Returns the guild ID where the interaction occurred.",
    takesBrackets: false,
    execute: async (context, args) => {
        return context.interaction?.guildId || "[Error: Not an interaction context or not in guild]";
    }
};