module.exports = {
    name: "$getGuildTemplate", description: "Fetches guild template info. Args: code", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires template code]"; const code = args[0];
        try { const template = await context.client.fetchGuildTemplate(code); return JSON.stringify(template); } // Returns raw template object as JSON
        catch (e) { return `[Error fetching template: ${e.message}]`; }
    }
};