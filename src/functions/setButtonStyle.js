const { ButtonStyle } = require('discord.js');
module.exports = {
    name: "$setButtonStyle", description: "Sets the style of the last added button in context. Args: style(Primary/Secondary/Success/Danger/Link)", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires style]"; if (!context.components || context.components.length === 0) return "[Error: No components added yet]";
        const styleStr = args[0]; let style;
        switch(styleStr?.toLowerCase()){ case 'primary': style = ButtonStyle.Primary; break; case 'secondary': style = ButtonStyle.Secondary; break; case 'success': style = ButtonStyle.Success; break; case 'danger': style = ButtonStyle.Danger; break; case 'link': style = ButtonStyle.Link; break; default: return "[Error: Invalid style]"; }
        const lastCompIndex = context.components.length - 1; if (context.components[lastCompIndex].type !== 2) return "[Error: Last added component is not a button]"; // Type 2 = Button
        context.components[lastCompIndex].style = style; if (style !== ButtonStyle.Link && !context.components[lastCompIndex].custom_id) context.components[lastCompIndex].custom_id = `button_${Date.now()}`; // Ensure non-link has ID
        return "";
    }
};