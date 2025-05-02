const { PermissionsBitField } = require('discord.js');
module.exports = {
    name: "$hasGuildPermission",
    description: "Checks if a member (or author) has specific permissions at the GUILD level. Args: permission1;[permission2...];[memberID=@me]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length === 0) return "[Error: $hasGuildPermission requires at least one permission name]";
        let memberId = null; let permissionsToCheck = [];
        const lastArg = args[args.length - 1];
        if (/^\d{17,19}$/.test(lastArg) || lastArg === '@me') { memberId = lastArg === '@me' ? context.member?.id : lastArg; permissionsToCheck = args.slice(0, -1); }
        else { memberId = context.member?.id; permissionsToCheck = args; }
        if (!memberId) return "[Error: Cannot determine target member for permission check]";
        if (!context.guild) return "[Error: $hasGuildPermission requires a guild context]";
        let targetMember = context.member;
        if (memberId !== context.member?.id) { try { targetMember = await context.guild.members.fetch(memberId); } catch (e) { return `[Error: Could not find member ${memberId}]`; } }
        if (!targetMember) return "[Error: Could not find member to check permissions]";
        const perms = targetMember.permissions;
        if (!perms) return "[Error: Could not evaluate permissions]";
        try {
             const permissionFlags = permissionsToCheck.map(p => { if (PermissionsBitField.Flags[p]) return PermissionsBitField.Flags[p]; throw new Error(`Invalid permission: ${p}`); });
             return perms.has(permissionFlags).toString();
        } catch (e) { return `[Error: Permission Check Failed - ${e.message}]`; }
    }
};