module.exports = {
    name: "$channelMention",
    description: "Returns the mention string (<#ID>) for the current channel or specified channel ID.",
    takesBrackets: true,
    execute: async (context, args) => {
        const channelId = args[0]?.trim() || context.channel?.id;
        if (!channelId || !/^\d{17,19}$/.test(channelId)) return "[Error: Invalid or missing channel ID]";
        return `<#${channelId}>`;
    }
};