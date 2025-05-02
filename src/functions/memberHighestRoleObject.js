module.exports = {
    name: "$memberHighestRoleObject", description: "Returns JSON string of member's highest Role object. Args: [memberID?]", takesBrackets: true,
    execute: async (context, args) => {
        const memberId = args[0]?.trim(); let targetMember = null; if (!context.guild) return "[Error: Requires guild context]"; if (memberId) { try { targetMember = await context.guild.members.fetch(memberId); } catch { return `[Error: Member ${memberId} not found]`; } } else { targetMember = context.member; }
        if (targetMember) return JSON.stringify(targetMember.roles.highest); return "[Error: Could not determine member]";
    }
};