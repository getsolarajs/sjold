module.exports = {
    name: "$modifyGuildTemplate", description: "Modifies a guild template. Args: code;optionsJson", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (args.length < 2) return "[Error: Requires template code and optionsJson]";
        const code = args[0]; const optionsJson = args[1]; let options; try { options = JSON.parse(optionsJson); } catch { return "[Error: Invalid options JSON]"; }
        if (!context.guild.members.me?.permissions.has("ManageGuild")) return "[Error: Bot lacks Manage Guild permission]";
        try { const template = await context.guild.fetchTemplates().then(t => t.find(tp => tp.code === code)); if (!template) return "[Error: Template not found in this guild]"; const modified = await template.edit(options); return modified.code; }
        catch (e) { return `[Error modifying template: ${e.message}]`; }
    }
};