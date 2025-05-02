module.exports = {
    name: "$setButtonDisabled", description: "Sets the disabled state of the last added button in context. Args: disabled(true/false)", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires true/false]"; if (!context.components || context.components.length === 0) return "[Error: No components added yet]";
        const disabled = args[0].toLowerCase() === 'true';
        const lastCompIndex = context.components.length - 1; if (context.components[lastCompIndex].type !== 2) return "[Error: Last added component is not a button]";
        context.components[lastCompIndex].disabled = disabled; return "";
    }
};