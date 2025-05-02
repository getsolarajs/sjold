module.exports = {
    name: "$botTags",
    description: "Returns the client user's application tags.",
    takesBrackets: false,
    execute: async (context, args) => {
         if (!context.client.application) {
             try { await context.client.application.fetch(); }
             catch (e) { return "[Error: Could not fetch application info]"; }
         }
        return context.client.application?.tags?.join(';') || "";
    }
};