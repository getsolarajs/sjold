const { StringSelectMenuOptionBuilder, StringSelectMenuBuilder } = require('discord.js');
module.exports = {
    name: "$addSelectMenuOption",
    description: "Adds an option to the last added STRING select menu builder AND updates the component list. Args: label;value;[description?];[emoji?];[default?]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $addSelectMenuOption requires label and value]";

        if (!context.currentComponent || !(context.currentComponent instanceof StringSelectMenuBuilder)) {
             return "[Error: Must be used after $addSelectMenu[string;...] ]";
        }
        const currentBuilder = context.currentComponent;

        const [label, value, description, emoji, defaultStr] = args;
        const isDefault = defaultStr?.toLowerCase() === 'true';

        if (label.length > 100) return "[Error: Label too long]";
        if (value.length > 100) return "[Error: Value too long]";
        if (description && description.length > 100) return "[Error: Description too long]";

        try {
            const option = new StringSelectMenuOptionBuilder()
                .setLabel(label)
                .setValue(value)
                .setDefault(isDefault);
            if (description) option.setDescription(description);
            if (emoji) option.setEmoji(emoji);

            currentBuilder.addOptions(option); 

            const menuIndex = context.components?.findIndex(c => c.custom_id === currentBuilder.data.custom_id && c.type === 3);
            if (menuIndex !== -1) {
                 context.components[menuIndex] = currentBuilder.toJSON(); 
            } else {
                 console.warn("$addSelectMenuOption: Could not find menu in components array to update, adding updated version.");
                 context.components = context.components || [];
                 context.components.push(currentBuilder.toJSON());
            }

        } catch (e) {
             return `[Error adding select option: ${e.message}]`;
        }
        return ""; 
    }
};