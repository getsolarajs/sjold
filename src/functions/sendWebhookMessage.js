const { WebhookClient } = require('discord.js');
module.exports = {
    name: "$sendWebhookMessage", description: "Sends a message via webhook ID and Token. Args: webhookID;webhookToken;content?;[optionsJson?]", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: Requires webhookID and webhookToken]";
        const id = args[0]; const token = args[1]; const content = args[2] || undefined; let options = {};
        if (args[3]) { try { options = JSON.parse(args[3]); } catch { return "[Error: Invalid options JSON]"; } }
        if (content) options.content = content;
        // Basic embed handling from context (if desired)
        if (context.embedData && Object.keys(context.embedData).length > 0) options.embeds = [context.embedData];
        if (!options.content && !options.embeds) return "[Error: Webhook message needs content or embed]";
        try { const webhookClient = new WebhookClient({ id, token }); await webhookClient.send(options); context.embedData = {}; return ""; } // Clear embed after send
        catch (e) { return `[Error sending webhook message: ${e.message}]`; }
    }
};