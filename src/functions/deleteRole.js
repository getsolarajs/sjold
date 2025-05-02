module.exports = {
    name: "$deleteRole",
    description: "Deletes a role in the current guild. Args: roleID;[reason]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $deleteRole requires a guild context]";
        if (!args[0]) return "[Error: $deleteRole requires a role ID]";
        const roleId = args[0]; const reason = args.slice(1).join(';');
        try {
            if (!context.guild.members.me?.permissions.has("ManageRoles")) return "[Error: Bot lacks Manage Roles permission]";
            const roleToDelete = await context.guild.roles.fetch(roleId);
            if (!roleToDelete) return `[Error: Role with ID ${roleId} not found]`;
            if (roleToDelete.position >= context.guild.members.me?.roles.highest.position) return "[Error: Cannot delete role - Role is higher than or equal to bot's highest role]";
            await roleToDelete.delete(reason || "Role deleted via bot."); return "";
        } catch (err) { return `[Error: Failed to delete role ${roleId} - ${err.message}]`; }
    }
};