const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: "$editMessage",
    description: "Edits a message sent previously by the bot. Args: messageID;[new content]. Uses current embed data.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $editMessage requires a message ID]";
        const messageId = args[0]; const newContent = args[1]; 
        let embedToSend = null;
        if (context.embedData && Object.keys(context.embedData).length > 0) {
            try { embedToSend = new EmbedBuilder(context.embedData); }
            catch (e) { context.embedData = {}; return `[Error: Failed to build embed for edit - ${e.message}]`; }
        }
        const payload = {};
        if (newContent !== undefined) payload.content = newContent; 
        if (embedToSend) payload.embeds = [embedToSend];

        if (payload.content === undefined && !payload.embeds) return "[Error: $editMessage called with no new content or embed data]";
        try {
            const channel = context.channel;
            if (!channel) return "[Error: Cannot determine channel context for $editMessage]";
            const messageToEdit = await channel.messages.fetch(messageId);
            if (messageToEdit.author.id !== context.client.user.id) return "[Error: Cannot edit a message not sent by the bot]";
            await messageToEdit.edit(payload);
            context.embedData = {}; return "";
        } catch (err) { context.embedData = {}; return `[Error: Failed to edit message ${messageId} - ${err.message}]`; }
    }
};