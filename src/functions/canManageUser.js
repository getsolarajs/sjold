module.exports = {
    name: "$canManageUser", description: "Checks if member1 can manage member2 (kick/ban/timeout/roles). Args: targetUserID;[managerMemberID?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (!args[0]) return "[Error: Requires targetUserID]";
        const targetUserId = args[0]; const managerId = args[1]?.trim() || context.guild.members.me?.id; if (!managerId) return "[Error: Cannot determine manager]";
        try { const targetMember = await context.guild.members.fetch(targetUserId).catch(()=>null); const managerMember = await context.guild.members.fetch(managerId); if (!managerMember) return "false"; if (!targetMember) return managerMember.permissions.has("BanMembers") ? "true" : "false"; return targetMember.manageable.toString(); } // manageable checks hierarchy and bot perms
        catch { return "false"; }
    }
};