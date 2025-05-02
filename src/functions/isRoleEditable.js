module.exports = {
    name: "$isRoleEditable",
    description: "Checks if the specified role ID is editable by the bot. Returns true or false.",
    takesBrackets: true,
    execute: async (context, args) => {
        const roleId = args[0]?.trim();
        if (!context.guild) return "[Error: $isRoleEditable requires a guild context]";
        if (!roleId || !/^\d{17,19}$/.test(roleId)) return "[Error: $isRoleEditable requires a valid role ID]";
        try {
            const role = await context.guild.roles.fetch(roleId);
            if (!role) return "false";
            return role.editable.toString();
        } catch(e) { return "false"; } 
    }
};