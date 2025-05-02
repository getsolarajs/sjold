module.exports = {
    name: "$roleName",
    description: "Returns the name of the specified role ID in the current guild.",
    takesBrackets: true,
    execute: async (context, args) => {
        const roleId = args[0]?.trim();
        if (!context.guild) return "[Error: $roleName requires a guild context]";
        if (!roleId || !/^\d{17,19}$/.test(roleId)) return "[Error: $roleName requires a valid role ID]";
        try {
            const role = await context.guild.roles.fetch(roleId);
            if (role) return role.name;
            return `[Error: Role with ID ${roleId} not found in this guild]`;
        } catch(e) { return `[Error: Role with ID ${roleId} not found in this guild]`; }
    }
};