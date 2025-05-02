module.exports = {
    name: "$memberPermissions", description: "Returns member's guild permissions. Args: [memberID?];[separator=;]", takesBrackets: true,
    execute: async (context, args) => {
        const memberId = args[0]?.trim(); const separator = args[1] !== undefined ? args[1] : ';';
        let targetMemberId = memberId && /^\d{17,19}$/.test(memberId) ? memberId : context.member?.id;
        if (!targetMemberId) return "[Error: Cannot determine member]"; if (!context.guild) return "[Error: Requires guild context]";
        try { const member = await context.guild.members.fetch(targetMemberId); if (!member) return `[Error: Member ${targetMemberId} not found]`; const perms = member.permissions; if (!perms) return "[Error: Could not calculate permissions]"; return perms.toArray().join(separator); }
        catch (e) { return `[Error fetching permissions: ${e.message}]`; }
    }
};