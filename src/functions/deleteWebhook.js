module.exports = {
    name: "$deleteWebhook", description: "Deletes a webhook by ID or URL. Args: webhookID_or_URL;[reason?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires webhook ID or URL]"; const identifier = args[0]; const reason = args[1];
        if (!context.guild || !context.guild.members.me?.permissions.has("ManageWebhooks")) return "[Error: Bot lacks Manage Webhooks permission]";
        try { const webhook = await context.client.fetchWebhook(identifier); await webhook.delete(reason); return ""; } // fetchWebhook works with ID or URL
        catch (e) { if (e.code === 10015) return "[Error: Webhook not found]"; return `[Error deleting webhook: ${e.message}]`; }
    }
};