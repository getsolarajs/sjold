module.exports = {
    name: "$channelID",
    description: "Returns the ID of the current channel or the channel specified by ID.",
    takesBrackets: true,
    execute: async (context, args) => {
        const channelId = args[0]?.trim();
        if (channelId) {
             if (/^\d{17,19}$/.test(channelId)) return channelId;
             return "[Error: Invalid ID format provided to $channelID]";
        } else if (context.channel) {
            return context.channel.id;
        }
        return "[Error: $channelID - Cannot determine channel context and no ID provided]";
    }
};