module.exports = {
    name: "$modalFieldValue",
    description: "Returns the value submitted for a specific field in a modal. Args: customID",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.interaction || !context.interaction.isModalSubmit()) {
            return "[Error: Not a modal submit interaction context]";
        }
        if (!args[0]) {
             return "[Error: $modalFieldValue requires the field's custom ID]";
        }
        const fieldCustomId = args[0];
        try {
            const value = context.interaction.fields.getTextInputValue(fieldCustomId);
            return value || "";
        } catch (e) {
             console.warn(`$modalFieldValue: Error getting value for custom ID "${fieldCustomId}": ${e.message}`);
             return "";
        }
    }
};