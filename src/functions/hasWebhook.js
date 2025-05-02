module.exports = {
    name: "$hasWebhook", description: "Checks if a channel has any webhooks the bot can see. Args: [channelID]", takesBrackets: true,
    execute: async (context, args) => {
        const channelId = args[0]?.trim() || context.channel?.id; if (!channelId) return "[Error: Requires channel context/ID]"; if (!context.guild || !context.guild.members.me?.permissions.has("ManageWebhooks")) return "false";
        try { const channel = await context.client.channels.fetch(channelId); if (!channel.isTextBased()) return "false"; const webhooks = await channel.fetchWebhooks(); return (webhooks.size > 0).toString(); } catch { return "false"; }
    }
};