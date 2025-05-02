const { EmbedBuilder, ActionRowBuilder } = require('discord.js');
module.exports = {
    name: "$followUp",
    description: "Sends a follow-up message to an interaction (must be replied/deferred first). Args: content;[ephemeral(true)];[returnMsgID(true)]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.interaction) return "[Error: Context is not an interaction]";
        if (!context.replied && !context.deferred) return "[Error: Interaction must be replied or deferred before using $followUp]";

        context.messageSent = true; 
        const content = args[0] || " ";
        const ephemeral = args[1]?.toLowerCase() === 'true';
        const returnMsgID = args[2]?.toLowerCase() === 'true';

        let embedToSend = null;
        if (context.embedData && Object.keys(context.embedData).length > 0) {
            try { embedToSend = new EmbedBuilder(context.embedData); }
            catch (e) { context.embedData = {}; context.components = []; return `[Error: Failed to build embed for followUp - ${e.message}]`; }
        }
        const payload = { ephemeral: ephemeral };
        if (content.trim()) payload.content = content;
        if (embedToSend) payload.embeds = [embedToSend];
        if (context.components && context.components.length > 0) {
             payload.components = []; let currentRow = new ActionRowBuilder();
             for (const componentJson of context.components) {
                 if (currentRow.components.length >= 5) { payload.components.push(currentRow); currentRow = new ActionRowBuilder(); }
                 try { currentRow.addComponents(componentJson); } catch (e) { console.error("followUp: Error adding component JSON:", e); }
             }
             if (currentRow.components.length > 0) payload.components.push(currentRow);
        }
        if (!payload.content && !payload.embeds && !payload.components?.length > 0) return "[Error: $followUp called with no content, embed data, or components built]";

        try {
            const sentMessage = await context.interaction.followUp(payload);
            context.embedData = {}; context.components = [];
            context.lastMessageID = sentMessage?.id; 
            context.lastMessage = sentMessage;
            return returnMsgID ? sentMessage?.id || "" : "";
        } catch (err) {
            console.error("Error in $followUp:", err);
            context.embedData = {}; context.components = [];
            return `[Error: Failed to send follow-up message - ${err.message}]`;
        }
    }
};