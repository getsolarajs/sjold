module.exports = {
    name: "$modifyRole", description: "Modifies role properties. Args: roleID;optionsJson;[reason]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (args.length < 2) return "[Error: Requires roleID and optionsJson]";
        const roleId = args[0]; const optionsJson = args[1]; const reason = args[2]; let options;
        try { options = JSON.parse(optionsJson); } catch { return "[Error: Invalid options JSON]"; }
        try { if (!context.guild.members.me?.permissions.has("ManageRoles")) return "[Error: Bot lacks Manage Roles permission]"; const role = await context.guild.roles.fetch(roleId); if (!role) return "[Error: Role not found]"; if (role.position >= context.guild.members.me?.roles.highest.position && (options.position !== undefined || options.permissions !== undefined || options.hoist !== undefined)) return "[Error: Cannot modify certain properties due to hierarchy]"; await role.edit(options, reason || "Role modified via bot"); return ""; }
        catch (e) { return `[Error modifying role ${roleId}: ${e.message}]`; }
    }
};