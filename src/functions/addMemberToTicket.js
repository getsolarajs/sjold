const { PermissionsBitField } = require('discord.js');
module.exports = {
    name: "$addMemberToTicket", description: "Adds a member to a ticket channel. Args: userID;[channelID?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires userID]"; const userId = args[0]; const channelId = args[1]?.trim() || context.channel?.id;
        if (!channelId || !context.client.tickets.has(channelId)) return "[Error: Requires valid ticket channel context or ID]";
        try { const channel = await context.client.channels.fetch(channelId); if (!channel) return "[Error: Ticket channel not found]"; await channel.permissionOverwrites.edit(userId, { ViewChannel: true, SendMessages: true, ReadMessageHistory: true, AttachFiles: true, EmbedLinks: true }); return ""; }
        catch (e) { return `[Error adding member: ${e.message}]`; }
    }
};