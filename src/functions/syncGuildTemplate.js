module.exports = {
    name: "$syncGuildTemplate", description: "Syncs a guild template. Args: code", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (!args[0]) return "[Error: Requires template code]"; const code = args[0];
        if (!context.guild.members.me?.permissions.has("ManageGuild")) return "[Error: Bot lacks Manage Guild permission]";
        try { const template = await context.guild.fetchTemplates().then(t => t.find(tp => tp.code === code)); if (!template) return "[Error: Template not found in this guild]"; await template.sync(); return template.code; }
        catch (e) { return `[Error syncing template: ${e.message}]`; }
    }
};