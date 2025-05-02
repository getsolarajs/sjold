const { EmbedBuilder, ActionRowBuilder } = require('discord.js');
module.exports = {
    name: "$sendMessage", description: "Explicitly sends message/embed/components/attachments. Returns message ID.", takesBrackets: true,
    execute: async (context, args) => {
        context.messageSent = true; const messageContent = args[0] || ""; let embedToSend = null;
        if (context.embedData && Object.keys(context.embedData).length > 0) { try { embedToSend = new EmbedBuilder(context.embedData); } catch (e) { context.embedData = {}; context.components = []; context.attachments = []; return `[Error building embed: ${e.message}]`; } }
        const payload = {}; if (messageContent) payload.content = messageContent; if (embedToSend) payload.embeds = [embedToSend];
        if (context.components && context.components.length > 0) { payload.components = []; let currentRow = new ActionRowBuilder(); for (const c of context.components) { if (currentRow.components.length >= 5) { payload.components.push(currentRow); currentRow = new ActionRowBuilder(); } try { currentRow.addComponents(c); } catch(e){ console.error("sendMessage Comp Add Error:",e); } } if (currentRow.components.length > 0) payload.components.push(currentRow); }
        if (context.attachments && context.attachments.length > 0) { payload.files = context.attachments; }
        if (!payload.content && !payload.embeds && !payload.components?.length && !payload.files?.length) return "[Error: $sendMessage called with nothing to send]";
        let sentMessage = null;
        try {
            if (context.interaction && context.interaction.isRepliable()) { if (context.replied || context.deferred) sentMessage = await context.interaction.followUp(payload); else { await context.interaction.reply(payload); sentMessage = await context.interaction.fetchReply(); context.replied = true; } }
            else if (context.channel) { sentMessage = await context.channel.send(payload); }
            else return "[Error: Cannot determine usable context]";
            context.embedData = {}; context.components = []; context.attachments = []; context.lastMessageID = sentMessage?.id; context.lastMessage = sentMessage; return sentMessage?.id || "";
        } catch (err) { context.embedData = {}; context.components = []; context.attachments = []; console.error("Error in $sendMessage:", err); return `[Error sending: ${err.message}]`; }
    }
};