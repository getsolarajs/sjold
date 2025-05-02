const { ComponentEmojiResolvable } = require('discord.js');
module.exports = {
    name: "$setButtonEmoji", description: "Sets the emoji of the last added button in context. Args: emoji", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires emoji]"; if (!context.components || context.components.length === 0) return "[Error: No components added yet]";
        const emoji = args[0];
        const lastCompIndex = context.components.length - 1; if (context.components[lastCompIndex].type !== 2) return "[Error: Last added component is not a button]";
        const customMatch = emoji.match(/<a?:.*?:(\d{17,19})>/); const nameMatch = emoji.match(/<:(.*?):\d{17,19}>/); const animatedMatch = emoji.match(/<a:/);
        context.components[lastCompIndex].emoji = { id: customMatch ? customMatch[1] : null, name: customMatch ? nameMatch?.[1] : emoji, animated: !!animatedMatch };
        return "";
    }
};