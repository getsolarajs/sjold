const { MentionableSelectMenuBuilder } = require('discord.js');
module.exports = {
    name: "$addMentionableSelectMenu", description: "Adds a user/role select menu. Args: customID;placeholder;[minValues=1];[maxValues=1];[disabled?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $addMentionableSelectMenu requires a customID]";
        const [customId, placeholder, minValuesStr, maxValuesStr, disabledStr] = args;
        if (customId.length > 100) return "[Error: customID too long]";
        const minValues = minValuesStr ? parseInt(minValuesStr, 10) : 1; const maxValues = maxValuesStr ? parseInt(maxValuesStr, 10) : 1; const disabled = disabledStr?.toLowerCase() === 'true';
        if (isNaN(minValues) || minValues < 0 || minValues > 25) return "[Error: Invalid minValues (0-25)]"; if (isNaN(maxValues) || maxValues < 1 || maxValues > 25) return "[Error: Invalid maxValues (1-25)]"; if (minValues > maxValues) return "[Error: minValues > maxValues]";
        const selectMenu = new MentionableSelectMenuBuilder().setCustomId(customId).setPlaceholder(placeholder || "Select users or roles...").setMinValues(minValues).setMaxValues(maxValues).setDisabled(disabled);
        context.components = context.components || []; context.components.push(selectMenu.toJSON());
        return "";
    }
};