module.exports = {
    name: "$modalComponentValue", description: "Alias for $modalFieldValue.", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.interaction?.isModalSubmit()) return "[Error: Not a modal submit interaction context]";
        if (!args[0]) return "[Error: Requires the field's custom ID]";
        try { return context.interaction.fields.getTextInputValue(args[0]) || ""; } catch { return ""; }
    }
};