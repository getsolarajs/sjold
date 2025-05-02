module.exports = {
    name: "$claimTicket", description: "Claims a ticket channel. Args: [channelID?]", takesBrackets: true,
    execute: async (context, args) => {
        const channelId = args[0]?.trim() || context.channel?.id;
        if (!channelId || !context.client.tickets.has(channelId)) return "[Error: Requires valid ticket channel context or ID]";
        const ticketData = context.client.tickets.get(channelId);
        if (ticketData.claimedBy) return `[Info: Ticket already claimed by <@${ticketData.claimedBy}>]`;
        ticketData.claimedBy = context.user.id; context.client.tickets.set(channelId, ticketData);
        try { const channel = await context.client.channels.fetch(channelId); if(channel) await channel.send(`Ticket claimed by <@${context.user.id}>.`); return ""; }
        catch { return "[Error updating ticket channel]"; }
    }
};