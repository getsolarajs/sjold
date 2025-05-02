const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: "$editIn",
    description: "Edits the last message sent by $sendMessage after a delay. Args: delayMs;newContent",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $editIn requires delayMs and newContent]";
        const delayMs = parseInt(args[0], 10);
        const newContent = args[1];
        if (isNaN(delayMs) || delayMs <= 0) return "[Error: Invalid delayMs for $editIn]";

        const messageToEdit = context.lastMessage;
        const originalContextState = { 
        };

        if (!messageToEdit || !messageToEdit.editable) {
            return "[Error: $editIn requires a previous, editable message sent by $sendMessage]";
        }

        console.log(`$editIn: Scheduling edit for message ${messageToEdit.id} in ${delayMs}ms`);
        setTimeout(async () => {
             try {
                 const payload = { content: newContent };
                 console.log(`$editIn: Executing scheduled edit for message ${messageToEdit.id}`);
                 await messageToEdit.edit(payload);
             } catch (e) {
                 console.error(`$editIn: Failed to edit message ${messageToEdit.id}:`, e);
             }
        }, delayMs);

        return "";
    }
};