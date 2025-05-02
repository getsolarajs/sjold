module.exports = {
    name: "$setUserRoles",
    description: "Sets a member's roles to only the specified role IDs (removes others). Args: memberID;roleID1;[roleID2...];[reason]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $setUserRoles requires a guild context]";
        if (args.length < 2) return "[Error: $setUserRoles requires memberID and at least one roleID]";
        const memberId = args[0];
        const roleIds = args.slice(1).filter(id => /^\d{17,19}$/.test(id.trim()));
        const reason = "Roles set via bot.";

        if (roleIds.length === 0) return "[Error: No valid role IDs provided to $setUserRoles]";

        try {
            const member = await context.guild.members.fetch(memberId);
            if (!context.guild.members.me?.permissions.has("ManageRoles")) return "[Error: Bot lacks Manage Roles permission]";

            for (const roleId of roleIds) {
                 const role = await context.guild.roles.fetch(roleId);
                 if (!role) return `[Error: Target role ${roleId} not found]`;
                 if (role.position >= context.guild.members.me?.roles.highest.position) return `[Error: Cannot manage target role ${roleId} due to hierarchy]`;
            }

            await member.roles.set(roleIds, reason);
            return "";
        } catch (err) {
            console.error("Error in $setUserRoles:", err);
            return `[Error: Failed to set roles for member ${memberId} - ${err.message}]`;
        }
    }
};