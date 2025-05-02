module.exports = {
    name: "$setRoleName",
    description: "Changes the name of a role. Args: roleID;newName;[reason]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $setRoleName requires a guild context]";
        if (args.length < 2) return "[Error: $setRoleName requires roleID and newName]";
        const roleId = args[0]; const newName = args[1]; const reason = args.slice(2).join(';');
        try {
            if (!context.guild.members.me?.permissions.has("ManageRoles")) return "[Error: Bot lacks Manage Roles permission]";
            const roleToEdit = await context.guild.roles.fetch(roleId);
            if (!roleToEdit) return `[Error: Role with ID ${roleId} not found]`;
            if (roleToEdit.position >= context.guild.members.me?.roles.highest.position) return "[Error: Cannot edit role name - Role is higher than or equal to bot's highest role]";
            await roleToEdit.edit({ name: newName }, reason || "Role name changed via bot."); return "";
        } catch (err) { return `[Error: Failed to set name for role ${roleId} - ${err.message}]`; }
    }
};