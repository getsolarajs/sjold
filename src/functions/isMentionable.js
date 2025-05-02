module.exports = {
    name: "$isMentionable",
    description: "Checks if the specified role ID is mentionable. Args: roleID",
    takesBrackets: true,
    execute: async (context, args) => {
        const roleId = args[0]?.trim();
        if (!context.guild) return "[Error: $isMentionable requires guild context]";
        if (!roleId || !/^\d{17,19}$/.test(roleId)) return "[Error: Requires valid role ID]";
        try { const role = await context.guild.roles.fetch(roleId); return role?.mentionable.toString() ?? "false"; }
        catch { return "false"; }
    }
};