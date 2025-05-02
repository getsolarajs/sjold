module.exports = {
    name: "$modifyWebhook", description: "Modifies a webhook. Args: webhookID_or_URL;optionsJson;[reason?]", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: Requires webhook ID/URL and optionsJson]";
        const identifier = args[0]; const optionsJson = args[1]; const reason = args[2]; let options;
        if (!context.guild || !context.guild.members.me?.permissions.has("ManageWebhooks")) return "[Error: Bot lacks Manage Webhooks permission]";
        try { options = JSON.parse(optionsJson); } catch { return "[Error: Invalid options JSON]"; }
        try { const webhook = await context.client.fetchWebhook(identifier); await webhook.edit(options, reason); return webhook.id; }
        catch (e) { return `[Error modifying webhook: ${e.message}]`; }
    }
};