module.exports = {
    name: "$addRole",
    description: "Adds a role to a member in the current guild. Args: memberID;roleID;[reason]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $addRole requires a guild context]";
        if (args.length < 2) return "[Error: $addRole requires memberID and roleID]";
        const memberId = args[0]; const roleId = args[1]; const reason = args.slice(2).join(';');
        try {
            const member = await context.guild.members.fetch(memberId);
            const role = await context.guild.roles.fetch(roleId);
            if (!role) return `[Error: Role with ID ${roleId} not found]`;
            if (!context.guild.members.me?.permissions.has("ManageRoles")) return "[Error: Bot lacks Manage Roles permission]";
            if (role.position >= context.guild.members.me?.roles.highest.position) return "[Error: Cannot add role - Role is higher than or equal to bot's highest role]";
            if (member.roles.cache.has(roleId)) return "[Info: Member already has this role]";
            await member.roles.add(roleId, reason || "Role added via bot."); return "";
        } catch (err) { return `[Error: Failed to add role ${roleId} to member ${memberId} - ${err.message}]`; }
    }
};