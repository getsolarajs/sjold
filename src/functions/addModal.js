const { ModalBuilder, TextInputBuilder, ActionRowBuilder } = require('discord.js');
module.exports = {
    name: "$addModal", description: "Builds modal data. Show with interaction event. Args: customID;title;$addTextInputResult1;$addTextInputResult2...", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $addModal requires customID and title]";
        const [customId, title] = args; const textInputs = args.slice(2);
        if (customId.length > 100) return "[Error: Modal customID too long]"; if (title.length > 45) return "[Error: Modal title too long]";
        const modal = new ModalBuilder().setCustomId(customId).setTitle(title);
        const rows = []; let parsingError = null;
        for (const inputDataStr of textInputs) {
            try {
                 const inputJson = String(inputDataStr);
                 if (inputJson.startsWith('{') && inputJson.endsWith('}')) {
                     const inputData = JSON.parse(inputJson);
                     if (inputData.type === 4) { 
                          rows.push(new ActionRowBuilder().addComponents(new TextInputBuilder(inputData)));
                     } else {
                          parsingError = `[Error: Invalid component type found inside $addModal. Expected TEXT_INPUT (4), got ${inputData.type}]`; break;
                     }
                 } else {
                      parsingError = `[Error: Invalid data format passed to $addModal. Expected JSON from $addTextInput, got: ${inputJson.slice(0, 50)}...]`; break;
                 }
            } catch (e) { parsingError = `[Error: Failed to parse $addTextInput JSON inside $addModal: ${e.message}]`; break; }
        }
        if (parsingError) return parsingError;
        if (rows.length === 0 || rows.length > 5) return "[Error: Modal must have 1-5 text input rows]";
        try { modal.addComponents(rows); } catch(e) { return `[Error adding components to modal: ${e.message}]`; }
        context.modal = modal;
        return "";
    }
};