module.exports = {
    name: "$setButtonLabel", description: "Sets the label of the last added button in context. Args: label", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires label]"; if (!context.components || context.components.length === 0) return "[Error: No components added yet]";
        const label = args[0]; if (label.length > 80) return "[Error: Button label too long]";
        const lastCompIndex = context.components.length - 1; if (context.components[lastCompIndex].type !== 2) return "[Error: Last added component is not a button]";
        context.components[lastCompIndex].label = label; return "";
    }
};