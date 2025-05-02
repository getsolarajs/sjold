const { EmbedBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: "$reply",
    description: "Explicitly replies to the command message. Returns the message ID.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.message) return "[Error: $reply requires a message context]";
        context.messageSent = true;
        const messageContent = args[0] || "";
        let embedToSend = null;
        if (context.embedData && Object.keys(context.embedData).length > 0) {
            try { embedToSend = new EmbedBuilder(context.embedData); }
            catch (e) { context.embedData = {}; context.components = []; return `[Error: Failed to build embed - ${e.message}]`; }
        }
        const payload = { failIfNotExists: false };
        if (messageContent) payload.content = messageContent;
        if (embedToSend) payload.embeds = [embedToSend];
        if (context.components && context.components.length > 0) {
             payload.components = []; let currentRow = new ActionRowBuilder();
             for (const componentJson of context.components) {
                 if (currentRow.components.length >= 5) { payload.components.push(currentRow); currentRow = new ActionRowBuilder(); }
                 try { currentRow.addComponents(componentJson); } catch (e) { console.error("reply: Error adding component JSON:", e); }
             }
             if (currentRow.components.length > 0) payload.components.push(currentRow);
        }

        if (!payload.content && !payload.embeds && !payload.components?.length > 0) {
            return "[Error: $reply called with no content, embed data, or components built]";
        }
        try {
            const sentReply = await context.message.reply(payload);
            context.embedData = {}; context.components = [];
            context.lastMessageID = sentReply.id;
            context.lastMessage = sentReply;
            return sentReply.id;
        } catch (err) {
            console.error("Error in $reply:", err);
            context.embedData = {}; context.components = [];
            return `[Error: Failed to send reply - ${err.message}]`;
        }
    }
};