module.exports = {
    name: "$setRoleMentionable", description: "Sets role mentionable status. Args: roleID;mentionable(true/false);[reason?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (args.length < 2) return "[Error: Requires roleID and true/false]";
        const roleId = args[0]; const mentionable = args[1]?.toLowerCase() === 'true'; const reason = args[2];
        try { if (!context.guild.members.me?.permissions.has("ManageRoles")) return "[Error: Bot lacks Manage Roles permission]"; const role = await context.guild.roles.fetch(roleId); if (!role) return "[Error: Role not found]"; if (role.position >= context.guild.members.me?.roles.highest.position) return "[Error: Cannot modify role due to hierarchy]"; await role.setMentionable(mentionable, reason || "Mentionable set via bot"); return ""; }
        catch (e) { return `[Error setting role mentionable: ${e.message}]`; }
    }
};