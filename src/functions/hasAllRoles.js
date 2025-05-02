module.exports = {
    name: "$hasAllRoles", description: "Checks if member has all of the specified roles. Args: memberID;roleID1;roleID2...", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (args.length < 2) return "[Error: Requires memberID and at least one roleID]";
        const memberId = args[0]; const roleIds = args.slice(1).filter(id => /^\d{17,19}$/.test(id.trim()));
        if (roleIds.length === 0) return "[Error: No valid role IDs provided]";
        try { const member = await context.guild.members.fetch(memberId); return roleIds.every(roleId => member.roles.cache.has(roleId)).toString(); }
        catch { return "false"; }
    }
};