module.exports = {
    name: "$getChannelWebhooks", description: "Returns semicolon-separated list of webhook IDs for a channel. Args: [channelID]", takesBrackets: true,
    execute: async (context, args) => {
        const channelId = args[0]?.trim() || context.channel?.id;
        if (!channelId) return "[Error: Requires channel context or ID]";
        if (!context.guild || !context.guild.members.me?.permissions.has("ManageWebhooks")) return "[Error: Bot lacks Manage Webhooks permission]";
        try { const channel = await context.client.channels.fetch(channelId); if (!channel.isTextBased()) return "[Error: Channel not text-based]"; const webhooks = await channel.fetchWebhooks(); return webhooks.map(wh => wh.id).join(';'); }
        catch (e) { return `[Error fetching webhooks: ${e.message}]`; }
    }
};