module.exports = {
    name: "$userRoles", description: "Returns member's roles. Args: [memberID?];[type=id/name?];[separator=;?]", takesBrackets: true,
    execute: async (context, args) => {
        const memberId = args[0]?.trim(); const type = args[1]?.toLowerCase() || 'id'; const separator = args[2] !== undefined ? args[2] : ';';
        let targetMember = null; if (!context.guild) return "[Error: Requires guild context]";
        if (memberId && /^\d{17,19}$/.test(memberId)) { try { targetMember = await context.guild.members.fetch(memberId); } catch { return `[Error: Member ${memberId} not found]`; } }
        else { targetMember = context.member; }
        if (!targetMember) return "[Error: Could not determine member]";
        const roles = targetMember.roles.cache.filter(r => r.id !== context.guild.id); 
        if (type === 'id') return roles.map(r => r.id).join(separator);
        if (type === 'name') return roles.map(r => r.name).join(separator);
        return "[Error: Invalid type for $userRoles. Use id or name]";
    }
};