module.exports = {
    name: "$interactionChannelID",
    description: "Returns the channel ID where the interaction occurred.",
    takesBrackets: false,
    execute: async (context, args) => {
        return context.interaction?.channelId || context.interaction?.channel?.id || "[Error: Not an interaction context or channel unavailable]";
    }
};