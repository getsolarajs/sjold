module.exports = {
    name: "$removeMemberFromTicket", description: "Removes a member from a ticket channel. Args: userID;[channelID?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires userID]"; const userId = args[0]; const channelId = args[1]?.trim() || context.channel?.id;
        if (!channelId || !context.client.tickets.has(channelId)) return "[Error: Requires valid ticket channel context or ID]";
        try { const channel = await context.client.channels.fetch(channelId); if (!channel) return "[Error: Ticket channel not found]"; await channel.permissionOverwrites.delete(userId, "Removed from ticket"); return ""; }
        catch (e) { return `[Error removing member: ${e.message}]`; }
    }
};