module.exports = {
    name: "$setEmbedURL", description: "Sets the URL for the embed title.", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $setEmbedURL requires a URL]";
        context.embedData = context.embedData || {};
        context.embedData.url = args[0]; return "";
    }
};