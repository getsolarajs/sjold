module.exports = {
    name: "$isHoisted",
    description: "Checks if the specified role ID is hoisted (displayed separately). Args: roleID",
    takesBrackets: true,
    execute: async (context, args) => {
        const roleId = args[0]?.trim();
        if (!context.guild) return "[Error: $isHoisted requires guild context]";
        if (!roleId || !/^\d{17,19}$/.test(roleId)) return "[Error: Requires valid role ID]";
        try { const role = await context.guild.roles.fetch(roleId); return role?.hoist.toString() ?? "false"; }
        catch { return "false"; }
    }
};