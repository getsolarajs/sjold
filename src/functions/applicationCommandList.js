module.exports = {
    name: "$applicationCommandList", description: "Returns a semicolon-separated list of registered slash command names.", takesBrackets: false,
    execute: async (context, args) => {
        try { const commands = await context.client.application?.commands.fetch(); return commands?.map(c => c.name).join(';') ?? ""; }
        catch { return "[Error fetching application commands]"; }
    }
};