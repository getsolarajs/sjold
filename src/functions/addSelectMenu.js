const { StringSelectMenuBuilder, UserSelectMenuBuilder, RoleSelectMenuBuilder, ChannelSelectMenuBuilder, MentionableSelectMenuBuilder, ComponentType } = require('discord.js');
module.exports = {
    name: "$addSelectMenu",
    description: "Adds a select menu. For String type, follow with $addSelectMenuOption. Args: type(string/user/role/channel/mentionable);customID;placeholder;[minValues=1];[maxValues=1];[disabled(true)]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $addSelectMenu requires type and customID]";
        const [typeStr, customId, placeholder, minValuesStr, maxValuesStr, disabledStr] = args;
        if (customId.length > 100) return "[Error: customID too long]";
        const minValues = minValuesStr ? parseInt(minValuesStr, 10) : 1;
        const maxValues = maxValuesStr ? parseInt(maxValuesStr, 10) : 1;
        const disabled = disabledStr?.toLowerCase() === 'true';
        if (isNaN(minValues) || minValues < 0 || minValues > 25) return "[Error: Invalid minValues (0-25)]";
        if (isNaN(maxValues) || maxValues < 1 || maxValues > 25) return "[Error: Invalid maxValues (1-25)]";
        if (minValues > maxValues) return "[Error: minValues > maxValues]";

        let selectMenuBuilder;
        const type = typeStr?.toLowerCase();
        switch(type) {
            case 'string': selectMenuBuilder = new StringSelectMenuBuilder(); break;
            case 'user': selectMenuBuilder = new UserSelectMenuBuilder(); break;
            case 'role': selectMenuBuilder = new RoleSelectMenuBuilder(); break;
            case 'channel': selectMenuBuilder = new ChannelSelectMenuBuilder(); break;
            case 'mentionable': selectMenuBuilder = new MentionableSelectMenuBuilder(); break;
            default: return "[Error: Invalid select menu type]";
        }

        selectMenuBuilder
            .setCustomId(customId)
            .setPlaceholder(placeholder || `Select ${type}...`)
            .setMinValues(minValues)
            .setMaxValues(maxValues)
            .setDisabled(disabled);

        if (type === 'string') {
            context.currentComponent = selectMenuBuilder;
            context.components = context.components || [];
            context.components.push(selectMenuBuilder.toJSON());
        } else {
            context.components = context.components || [];
            context.components.push(selectMenuBuilder.toJSON()); 
            context.currentComponent = null; 
        }
        return "";
    }
};