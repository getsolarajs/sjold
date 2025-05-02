module.exports = {
    name: "$getMessageInteraction", description: "Returns basic info (ID, Type, UserID) about the interaction a message responded to. Args: messageID", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $getMessageInteraction requires messageID]";
        const messageId = args[0]; const channel = context.channel; if (!channel) return "[Error: Cannot determine channel context]";
        try { const msg = await channel.messages.fetch(messageId); if (!msg.interaction) return ""; return `${msg.interaction.id};${InteractionType[msg.interaction.type]};${msg.interaction.user.id}`; }
        catch { return "[Error fetching message or interaction]"; }
    }
};