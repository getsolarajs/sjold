module.exports = {
    name: "$roleExists",
    description: "Checks if a role exists in the current guild. Args: roleID",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $roleExists requires a guild context]";
        if (!args[0]) return "[Error: $roleExists requires a role ID]";
        const roleId = args[0];
        if (!/^\d{17,19}$/.test(roleId)) return "false";
        try { await context.guild.roles.fetch(roleId); return "true"; }
        catch (err) { if (err.code === 10011) return "false"; return "false"; }
    }
};