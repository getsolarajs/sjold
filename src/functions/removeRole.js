module.exports = {
    name: "$removeRole",
    description: "Removes a role from a member in the current guild. Args: memberID;roleID;[reason]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $removeRole requires a guild context]";
        if (args.length < 2) return "[Error: $removeRole requires memberID and roleID]";
        const memberId = args[0]; const roleId = args[1]; const reason = args.slice(2).join(';');
        try {
            const member = await context.guild.members.fetch(memberId);
            const role = await context.guild.roles.fetch(roleId);
            if (!role) return `[Error: Role with ID ${roleId} not found]`;
            if (!context.guild.members.me?.permissions.has("ManageRoles")) return "[Error: Bot lacks Manage Roles permission]";
            if (role.position >= context.guild.members.me?.roles.highest.position) return "[Error: Cannot remove role - Role is higher than or equal to bot's highest role]";
            if (!member.roles.cache.has(roleId)) return "[Info: Member does not have this role]";
            await member.roles.remove(roleId, reason || "Role removed via bot."); return "";
        } catch (err) { return `[Error: Failed to remove role ${roleId} from member ${memberId} - ${err.message}]`; }
    }
};