const { ChannelType, PermissionsBitField, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
module.exports = {
    name: "$newTicket", description: "Creates a new ticket channel. Args: topic;[categoryID?];[private(true)?];[reason?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (!args[0]) return "[Error: Requires ticket topic/reason]";
        const topic = args[0]; const categoryId = args[1]; const isPrivate = args[2]?.toLowerCase() === 'true'; const reason = args[3];
        const userName = context.user?.username.replace(/[^a-zA-Z0-9-_]/g, '') || 'ticket'; // Sanitize username
        const channelName = `ticket-${userName}-${Date.now() % 10000}`;
        try {
            if (!context.guild.members.me?.permissions.has("ManageChannels")) return "[Error: Bot lacks Manage Channels permission]";
            const overwrites = [ { id: context.guild.id, deny: [PermissionsBitField.Flags.ViewChannel] }, { id: context.user.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.EmbedLinks] }, { id: context.client.user.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.ManageMessages, PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.EmbedLinks] } ];
            if (isPrivate) { /* Add Support Role Overwrites Here if needed */ }
            const options = { name: channelName, type: ChannelType.GuildText, topic: `Ticket by ${context.user.tag}. Topic: ${topic}`, permissionOverwrites: overwrites, reason: reason || "Ticket created" };
            if (categoryId && /^\d{17,19}$/.test(categoryId)) options.parent = categoryId;
            const ticketChannel = await context.guild.channels.create(options);
            context.client.tickets.set(ticketChannel.id, { userId: context.user.id, claimedBy: null, timestamp: Date.now(), topic: topic });
            const embed = new EmbedBuilder().setTitle(`Ticket Created: ${topic}`).setDescription(`Welcome <@${context.user.id}>! Staff will be with you shortly.`).setColor("Green").setTimestamp();
            const closeButton = new ButtonBuilder().setCustomId(`ticket_close_${ticketChannel.id}`).setLabel("Close Ticket").setStyle(ButtonStyle.Danger);
            const claimButton = new ButtonBuilder().setCustomId(`ticket_claim_${ticketChannel.id}`).setLabel("Claim Ticket").setStyle(ButtonStyle.Primary);
            const row = new ActionRowBuilder().addComponents(closeButton, claimButton);
            await ticketChannel.send({ content: `<@${context.user.id}>`, embeds: [embed], components: [row] });
            return ticketChannel.id; // Return new channel ID
        } catch (e) { return `[Error creating ticket: ${e.message}]`; }
    }
}; // Note: Button handlers (ticket_close_*, ticket_claim_*) need separate commands.