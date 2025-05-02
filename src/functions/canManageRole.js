module.exports = {
    name: "$canManageRole", description: "Checks if the bot (or specified member) can manage a role. Args: roleID;[memberID?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (!args[0]) return "[Error: Requires roleID]";
        const roleId = args[0]; const memberId = args[1]?.trim() || context.guild.members.me?.id; if (!memberId) return "[Error: Cannot determine member]";
        try { const role = await context.guild.roles.fetch(roleId); if (!role) return "false"; const member = await context.guild.members.fetch(memberId); if (!member) return "false"; return role.editable && member.roles.highest.position > role.position ? "true" : "false"; } // Simplified check
        catch { return "false"; }
    }
};