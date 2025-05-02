module.exports = {
    name: "$applicationOwnerID", description: "Returns the user ID of the application owner.", takesBrackets: false,
    execute: async (context, args) => {
        try { if (!context.client.application?.owner) await context.client.application?.fetch(); return context.client.application?.owner?.id ?? ""; }
        catch { return "[Error fetching application owner]"; }
    }
};