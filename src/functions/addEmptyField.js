module.exports = {
    name: "$addEmptyField", description: "Adds an empty inline or non-inline field (useful for spacing). Args: [inline(true/false)]", takesBrackets: true,
    execute: async (context, args) => {
        context.embedData = context.embedData || {}; context.embedData.fields = context.embedData.fields || [];
        const inline = args[0]?.toLowerCase() === 'true';
        // Use zero-width space for name/value to render field
        context.embedData.fields.push({ name: '\u200B', value: '\u200B', inline: inline });
        return "";
    }
};