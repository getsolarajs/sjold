const { EmbedBuilder, ActionRowBuilder } = require('discord.js');
module.exports = {
    name: "$interactionReply",
    description: "Replies to an interaction. Fails if already replied/deferred. Args: content;[ephemeral(true)];[returnMsgID(true)]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.interaction || !context.interaction.isRepliable()) return "[Error: Context is not a repliable interaction]";
        if (context.replied || context.deferred) return "[Error: Interaction already replied or deferred. Use $followUp or $interactionUpdate]";

        context.messageSent = true; 
        const content = args[0] || " "; 
        const ephemeral = args[1]?.toLowerCase() === 'true';
        const returnMsgID = args[2]?.toLowerCase() === 'true';

        let embedToSend = null;
        if (context.embedData && Object.keys(context.embedData).length > 0) {
            try { embedToSend = new EmbedBuilder(context.embedData); }
            catch (e) { context.embedData = {}; context.components = []; return `[Error: Failed to build embed for interactionReply - ${e.message}]`; }
        }
        const payload = { ephemeral: ephemeral };
        if (content.trim()) payload.content = content;
        if (embedToSend) payload.embeds = [embedToSend];
        if (context.components && context.components.length > 0) {
             payload.components = []; let currentRow = new ActionRowBuilder();
             for (const componentJson of context.components) {
                 if (currentRow.components.length >= 5) { payload.components.push(currentRow); currentRow = new ActionRowBuilder(); }
                 try { currentRow.addComponents(componentJson); } catch (e) { console.error("interactionReply: Error adding component JSON:", e); }
             }
             if (currentRow.components.length > 0) payload.components.push(currentRow);
        }
        if (!payload.content && !payload.embeds && !payload.components?.length > 0) return "[Error: $interactionReply called with no content, embed data, or components built]";

        try {
            await context.interaction.reply(payload);
            context.replied = true;
            context.embedData = {}; context.components = [];

            if (returnMsgID && !ephemeral) {
                 try {
                      const replyMsg = await context.interaction.fetchReply();
                      context.lastMessageID = replyMsg.id;
                      context.lastMessage = replyMsg;
                      return replyMsg.id;
                 } catch (fetchErr) {
                      console.warn("interactionReply: Could not fetch reply message after sending.");
                      return "";
                 }
            }
            return "";
        } catch (err) {
            console.error("Error in $interactionReply:", err);
            context.embedData = {}; context.components = [];
            context.replied = true; 
            return `[Error: Failed to send interaction reply - ${err.message}]`;
        }
    }
};