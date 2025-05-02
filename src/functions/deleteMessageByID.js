module.exports = {
    name: "$deleteMessageByID", description: "Deletes a specific message. Args: messageID;[channelID?];[reason?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires messageID]"; const messageId = args[0]; const channelId = args[1]?.trim() || context.channel?.id; const reason = args[2];
        if (!channelId) return "[Error: Requires channel context or ID]";
        try { const channel = await context.client.channels.fetch(channelId); if (!channel?.messages) return "[Error: Invalid channel]"; if (!channel.permissionsFor(context.guild?.members.me)?.has("ManageMessages")) return "[Error: Bot lacks Manage Messages permission]"; const message = await channel.messages.fetch(messageId); await message.delete({ reason: reason || "Message deleted via bot" }); return ""; }
        catch (e) { if (e.code === 10008) return "[Info: Message already deleted or not found]"; return `[Error deleting message: ${e.message}]`; }
    }
};