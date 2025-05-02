module.exports = {
    name: "$unclaimTicket", description: "Unclaims a ticket channel. Args: [channelID?]", takesBrackets: true,
    execute: async (context, args) => {
        const channelId = args[0]?.trim() || context.channel?.id;
        if (!channelId || !context.client.tickets.has(channelId)) return "[Error: Requires valid ticket channel context or ID]";
        const ticketData = context.client.tickets.get(channelId);
        if (!ticketData.claimedBy) return "[Info: Ticket is not currently claimed]";
         if (ticketData.claimedBy !== context.user.id && !context.member?.permissions.has("Administrator")) return "[Error: You cannot unclaim a ticket claimed by someone else]";
        ticketData.claimedBy = null; context.client.tickets.set(channelId, ticketData);
        try { const channel = await context.client.channels.fetch(channelId); if(channel) await channel.send(`Ticket unclaimed by <@${context.user.id}>.`); return ""; }
        catch { return "[Error updating ticket channel]"; }
    }
};