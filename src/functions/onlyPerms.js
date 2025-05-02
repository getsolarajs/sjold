const { PermissionsBitField } = require('discord.js');
const StopExecutionError = require('../errors/StopExecutionError');
module.exports = {
    name: "$onlyPerms",
    description: "Restricts command usage to users with specific permissions. Args: perm1;[perm2...];[errorMsg]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length === 0) throw new StopExecutionError("❌ Command requires permissions, but none were specified.");
        if (!context.member) throw new StopExecutionError("❌ Cannot check permissions outside of a server.");
        let errorMsg = `❌ You lack the required permissions to use this command.`;
        let permsToCheck = [...args];
        const lastArg = permsToCheck[permsToCheck.length - 1];
        if (permsToCheck.length > 1 && !PermissionsBitField.Flags[lastArg]) {
            errorMsg = permsToCheck.pop();
        }
        try {
            const permissionFlags = permsToCheck.map(p => {
                 if (PermissionsBitField.Flags[p]) return PermissionsBitField.Flags[p];
                 throw new Error(`Invalid permission: ${p}`);
             });
            const memberPerms = context.channel ? context.member.permissionsIn(context.channel) : context.member.permissions;
            if (!memberPerms || !memberPerms.has(permissionFlags)) {
                throw new StopExecutionError(errorMsg);
            }
        } catch(e) { throw new StopExecutionError(`[Perm Check Error: ${e.message}]`); }
        return "";
    }
};