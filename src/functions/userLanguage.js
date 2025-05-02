module.exports = {
    name: "$userLanguage",
    description: "Returns the user's preferred language locale (e.g., 'en-US').",
    takesBrackets: false,
    execute: async (context, args) => {
        return context.interaction?.locale || context.message?.locale || context.guild?.preferredLocale || "en-US";
    }
};