module.exports = {
    name: "$closeTicket", description: "Closes/deletes a ticket channel. Args: [channelID?];[reason?]", takesBrackets: true,
    execute: async (context, args) => {
        const channelId = args[0]?.trim() || context.channel?.id; const reason = args[1];
        if (!channelId) return "[Error: Requires channel context or ID]";
        if (!context.client.tickets.has(channelId)) return "[Error: Channel is not a recognized ticket]"; // Check internal state
        // Add permission checks (e.g., staff role or original user?)
        try { const channel = await context.client.channels.fetch(channelId); if (!channel) return "[Error: Ticket channel not found]"; /* Add transcript logic here if needed */ await channel.delete(reason || "Ticket closed"); context.client.tickets.delete(channelId); return ""; }
        catch (e) { return `[Error closing ticket: ${e.message}]`; }
    }
};