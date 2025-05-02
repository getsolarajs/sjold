module.exports = {
    name: "$createGuildTemplate", description: "Creates a guild template. Args: name;[description?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (!args[0]) return "[Error: Requires template name]";
        const name = args[0]; const description = args[1];
        if (!context.guild.members.me?.permissions.has("ManageGuild")) return "[Error: Bot lacks Manage Guild permission]";
        try { const template = await context.guild.createTemplate(name, description); return template.code; }
        catch (e) { return `[Error creating template: ${e.message}]`; }
    }
};