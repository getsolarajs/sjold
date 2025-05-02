module.exports = {
    name: "$messageChannelID", description: "Alias for $channelID, specifically for the message's channel.", takesBrackets: false,
    execute: async (context, args) => { return context.message?.channelId || context.channel?.id || ""; }
};