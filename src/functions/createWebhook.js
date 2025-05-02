module.exports = {
    name: "$createWebhook", description: "Creates a webhook in a channel. Args: channelID;name;[avatarURL?];[reason?]", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: Requires channelID and name]";
        const channelId = args[0]; const name = args[1]; const avatarURL = args[2]; const reason = args[3];
        if (!context.guild || !context.guild.members.me?.permissions.has("ManageWebhooks")) return "[Error: Bot lacks Manage Webhooks permission]";
        try { const channel = await context.client.channels.fetch(channelId); if (!channel || !channel.isTextBased() || channel.isDMBased()) return "[Error: Invalid channel for webhook]"; const webhook = await channel.createWebhook({ name: name, avatar: avatarURL, reason: reason }); return webhook.id; } // Returns webhook ID
        catch (e) { return `[Error creating webhook: ${e.message}]`; }
    }
};