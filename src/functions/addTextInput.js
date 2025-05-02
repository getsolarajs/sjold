const { TextInputBuilder, TextInputStyle } = require('discord.js');
module.exports = {
    name: "$addTextInput", description: "Defines a text input for $addModal. Returns JSON for builder. Args: customID;label;style(Short/Paragraph);required(true/false)?;minLength?;maxLength?;placeholder?;value?", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 3) return "[Error: $addTextInput requires customID, label, and style]";
        const [customId, label, styleStr, requiredStr, minLengthStr, maxLengthStr, placeholder, value] = args;
        let style; switch(styleStr?.toLowerCase()) { case 'short': style = TextInputStyle.Short; break; case 'paragraph': style = TextInputStyle.Paragraph; break; default: return "[Error: Invalid text input style]"; }
        const required = requiredStr?.toLowerCase() === 'true'; const minLength = minLengthStr ? parseInt(minLengthStr, 10) : undefined; const maxLength = maxLengthStr ? parseInt(maxLengthStr, 10) : undefined;
        if (customId.length > 100) return "[Error: Text input customID too long]"; if (label.length > 45) return "[Error: Text input label too long]";
        const input = new TextInputBuilder().setCustomId(customId).setLabel(label).setStyle(style).setRequired(required);
        if (minLength !== undefined && !isNaN(minLength)) input.setMinLength(minLength); if (maxLength !== undefined && !isNaN(maxLength)) input.setMaxLength(maxLength); if (placeholder) input.setPlaceholder(placeholder); if (value) input.setValue(value);
        try { return JSON.stringify(input.toJSON()); } catch (e) { return `[Error creating text input JSON: ${e.message}]`; }
    }
};