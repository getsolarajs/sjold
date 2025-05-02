module.exports = {
    name: "$purgeUserMessages", description: "Purges messages by a user in a channel. Args: userID;amount;[channelID?]", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: Requires userID and amount]"; const userId = args[0]; const amount = parseInt(args[1], 10); const channelId = args[2]?.trim() || context.channel?.id;
        if (!channelId) return "[Error: Requires channel context or ID]"; if (isNaN(amount) || amount < 1 || amount > 100) return "[Error: Amount must be 1-100]";
        try { const channel = await context.client.channels.fetch(channelId); if (!channel?.messages) return "[Error: Invalid channel]"; if (!channel.permissionsFor(context.guild?.members.me)?.has("ManageMessages")) return "[Error: Bot lacks Manage Messages permission]"; const messages = await channel.messages.fetch({ limit: 100 }); const userMessages = messages.filter(m => m.author.id === userId).first(amount); const fourteenDaysAgo = Date.now() - 14 * 24 * 60 * 60 * 1000; const messagesToDelete = userMessages.filter(m => m.createdTimestamp > fourteenDaysAgo); if (messagesToDelete.length === 0) return "[Info: No recent messages found from user to delete]"; if (messagesToDelete.length === 1) await messagesToDelete[0].delete(); else await channel.bulkDelete(messagesToDelete, true); return messagesToDelete.length.toString(); } // Return count deleted
        catch (e) { return `[Error purging messages: ${e.message}]`; }
    }
};