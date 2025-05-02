// File: finalizeSelectMenu.js
const { StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    name: "$finalizeSelectMenu",
    description: "Finalizes the current select menu builder and adds its JSON data to the component list.",
    takesBrackets: false,
    execute: async (context, args) => {
        if (!context.currentComponent || typeof context.currentComponent.toJSON !== 'function') {
            return "[Error: No select menu builder found in context. Use $addSelectMenu first.]";
        }

        if (context.currentComponent instanceof StringSelectMenuBuilder) {
            if (!context.currentComponent.options || context.currentComponent.options.length === 0) {
                return "[Error: String Select Menu must have at least one option added via $addSelectMenuOption before finalizing]";
            }
        }

        context.components = context.components || [];

        try {
            const selectMenuJSON = context.currentComponent.toJSON();
            context.components.push(selectMenuJSON);
        } catch (e) {
            console.error("Error finalizing select menu:", e);
            return "[Error converting select menu builder to JSON]";
        }

        context.currentComponent = null;

        return "";
    }
};