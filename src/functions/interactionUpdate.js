const { EmbedBuilder, ActionRowBuilder } = require('discord.js');
module.exports = {
    name: "$interactionUpdate",
    description: "Edits the original message of a component interaction. Args: [content]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.interaction || !context.interaction.isMessageComponent()) {
            return "[Error: $interactionUpdate requires a message component interaction context]";
        }
        if (context.replied || context.deferred) return "[Error: Interaction already replied or deferred. Cannot update now.]";

        context.messageSent = true; 
        const content = args[0]; 

        let embedToSend = null;
        if (context.embedData && Object.keys(context.embedData).length > 0) {
            try { embedToSend = new EmbedBuilder(context.embedData); }
            catch (e) { context.embedData = {}; context.components = []; return `[Error: Failed to build embed for interactionUpdate - ${e.message}]`; }
        }
        const payload = {};
        if (content !== undefined) payload.content = content;
        payload.embeds = embedToSend ? [embedToSend] : [];
        if (context.components && context.components.length > 0) {
             payload.components = []; let currentRow = new ActionRowBuilder();
             for (const componentJson of context.components) {
                 if (currentRow.components.length >= 5) { payload.components.push(currentRow); currentRow = new ActionRowBuilder(); }
                 try { currentRow.addComponents(componentJson); } catch (e) { console.error("interactionUpdate: Error adding component JSON:", e); }
             }
             if (currentRow.components.length > 0) payload.components.push(currentRow);
        } else {
             payload.components = []; 
        }

        if (payload.content === undefined && !payload.embeds.length && !payload.components.length) {
             return "[Error: $interactionUpdate called with nothing to update]";
        }

        try {
            await context.interaction.update(payload);
            context.replied = true;
            context.embedData = {}; context.components = [];
            context.lastMessageID = context.interaction.message?.id; 
            context.lastMessage = context.interaction.message;
            return "";
        } catch (err) {
            console.error("Error in $interactionUpdate:", err);
            context.embedData = {}; context.components = [];
            context.replied = true; 
            return `[Error: Failed to update interaction message - ${err.message}]`;
        }
    }
};