module.exports = {
    name: "$setRolePosition",
    description: "Changes the position of a role. Args: roleID;newPosition;[reason]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $setRolePosition requires a guild context]";
        if (args.length < 2) return "[Error: $setRolePosition requires roleID and newPosition]";
        const roleId = args[0]; const newPosition = parseInt(args[1], 10); const reason = args.slice(2).join(';');
        if (isNaN(newPosition) || newPosition < 0) return "[Error: Invalid newPosition for role]";
        try {
            if (!context.guild.members.me?.permissions.has("ManageRoles")) return "[Error: Bot lacks Manage Roles permission]";
            const roleToEdit = await context.guild.roles.fetch(roleId);
            if (!roleToEdit) return `[Error: Role with ID ${roleId} not found]`;
            if (roleToEdit.position >= context.guild.members.me?.roles.highest.position) return "[Error: Cannot manage role position - Role is higher than or equal to bot's highest role]";
            if (newPosition >= context.guild.members.me?.roles.highest.position) return "[Error: Cannot move role to position higher than or equal to bot's highest role]";
            await roleToEdit.setPosition(newPosition, { reason: reason || "Role position changed via bot." }); return "";
        } catch (err) { return `[Error: Failed to set position for role ${roleId} - ${err.message}]`; }
    }
};