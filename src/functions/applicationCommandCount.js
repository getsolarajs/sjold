module.exports = {
    name: "$applicationCommandCount", description: "Returns the number of registered slash commands.", takesBrackets: false,
    execute: async (context, args) => {
        try { const commands = await context.client.application?.commands.fetch(); return commands?.size.toString() ?? "0"; }
        catch { return "[Error fetching application commands]"; }
    }
};