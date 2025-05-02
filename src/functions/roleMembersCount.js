module.exports = {
    name: "$roleMembersCount",
    description: "Returns the number of members with the specified role ID in the current guild.",
    takesBrackets: true,
    execute: async (context, args) => {
        const roleId = args[0]?.trim();
        if (!context.guild) return "[Error: $roleMembersCount requires a guild context]";
        if (!roleId || !/^\d{17,19}$/.test(roleId)) return "[Error: $roleMembersCount requires a valid role ID]";
        try {
            const role = await context.guild.roles.fetch(roleId);
            if (!role) return `[Error: Role ${roleId} not found]`;
             if (!context.guild.members.cache.size >= (context.guild.memberCount || 1) * 0.8) {
                  await context.guild.members.fetch();
             }
            return role.members.size.toString();
        } catch(e) { return `[Error fetching role/members: ${e.message}]`; }
    }
};