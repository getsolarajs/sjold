module.exports = {
    name: "$getMessageComponents", description: "Returns the JSON string of components on a message. Args: messageID", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $getMessageComponents requires messageID]";
        const messageId = args[0]; const channel = context.channel; if (!channel) return "[Error: Cannot determine channel context]";
        try { const msg = await channel.messages.fetch(messageId); return JSON.stringify(msg.components?.map(row => row.toJSON()) ?? []); }
        catch { return "[Error: Could not fetch message or components]"; }
    }
};