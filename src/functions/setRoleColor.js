module.exports = {
    name: "$setRoleColor",
    description: "Changes the color of a role. Args: roleID;hexColor;[reason]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $setRoleColor requires a guild context]";
        if (args.length < 2) return "[Error: $setRoleColor requires roleID and hexColor]";
        const roleId = args[0]; const hexColor = args[1]; const reason = args.slice(2).join(';');
        try {
            if (!context.guild.members.me?.permissions.has("ManageRoles")) return "[Error: Bot lacks Manage Roles permission]";
            const roleToEdit = await context.guild.roles.fetch(roleId);
            if (!roleToEdit) return `[Error: Role with ID ${roleId} not found]`;
            if (roleToEdit.position >= context.guild.members.me?.roles.highest.position) return "[Error: Cannot edit role color - Role is higher than or equal to bot's highest role]";
            await roleToEdit.edit({ color: hexColor }, reason || "Role color changed via bot."); return "";
        } catch (err) {
             if (err.message?.includes('Invalid Form Body') && err.message?.includes('color')) return `[Error: Invalid hex color "${hexColor}"]`;
            return `[Error: Failed to set color for role ${roleId} - ${err.message}]`;
        }
    }
};