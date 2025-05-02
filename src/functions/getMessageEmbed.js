module.exports = {
    name: "$getMessageEmbed", description: "Returns the JSON string of an embed on a message. Args: messageID;[index=1]", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $getMessageEmbed requires messageID]";
        const messageId = args[0]; const index = args[1] ? parseInt(args[1], 10) : 1;
        if (isNaN(index) || index < 1) return "[Error: Invalid index (must be >= 1)]";
        const channel = context.channel; if (!channel) return "[Error: Cannot determine channel context]";
        try { const msg = await channel.messages.fetch(messageId); if (index > msg.embeds.length) return ""; const embedData = msg.embeds[index - 1]?.toJSON(); return embedData ? JSON.stringify(embedData) : ""; }
        catch { return "[Error: Could not fetch message or embed]"; }
    }
};