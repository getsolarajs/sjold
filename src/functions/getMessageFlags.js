module.exports = {
    name: "$getMessageFlags", description: "Returns semicolon-separated list of flags for a message. Args: messageID", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $getMessageFlags requires messageID]";
        const messageId = args[0]; const channel = context.channel; if (!channel) return "[Error: Cannot determine channel context]";
        try { const msg = await channel.messages.fetch(messageId); return msg.flags?.toArray().join(';') ?? ""; }
        catch { return "[Error: Could not fetch message]"; }
    }
};