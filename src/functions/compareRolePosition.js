module.exports = {
    name: "$compareRolePosition", description: "Compares two roles' positions. Returns >0 if role1 > role2, <0 if role1 < role2, 0 if equal. Args: roleID1;roleID2", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (args.length < 2) return "[Error: Requires two role IDs]";
        const roleId1 = args[0]; const roleId2 = args[1];
        if (!/^\d{17,19}$/.test(roleId1) || !/^\d{17,19}$/.test(roleId2)) return "[Error: Invalid Role ID format]";
        try { const role1 = await context.guild.roles.fetch(roleId1); const role2 = await context.guild.roles.fetch(roleId2); if (!role1 || !role2) return "[Error: One or both roles not found]"; return context.guild.roles.comparePositions(role1, role2).toString(); }
        catch { return "[Error fetching roles for comparison]"; }
    }
};