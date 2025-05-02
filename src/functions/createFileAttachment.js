const { AttachmentBuilder } = require('discord.js');
module.exports = {
    name: "$createFileAttachment", description: "Creates attachment data to be sent with the message. Args: source;[name]", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires file source (path/URL/buffer)]";
        const source = args[0]; const name = args[1];
        try { const attachment = new AttachmentBuilder(source, { name: name }); context.attachments = context.attachments || []; context.attachments.push(attachment); return ""; }
        catch (e) { return `[Error creating attachment: ${e.message}]`; }
    }
};