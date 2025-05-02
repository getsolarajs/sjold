module.exports = {
    name: "$messageAuthorObject", description: "Returns JSON string of triggering message's Author User object.", takesBrackets: false,
    execute: async (context, args) => { return context.message?.author ? JSON.stringify(context.message.author) : "[Error: Requires message context]"; }
};