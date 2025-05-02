const StopExecutionError = require('../errors/StopExecutionError');
module.exports = {
    name: "$onlyForRoles",
    description: "Restricts command usage to users with specific role IDs. Args: roleID1;[roleID2...];[errorMsg]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length === 0) throw new StopExecutionError("❌ Command requires roles, but none specified.");
        if (!context.member) throw new StopExecutionError("❌ Cannot check roles outside of a server.");
        let errorMsg = `❌ You do not have the required roles to use this command.`;
        let rolesToCheck = [...args];
        const lastArg = rolesToCheck[rolesToCheck.length - 1];
        if (rolesToCheck.length > 1 && !/^\d{17,19}$/.test(lastArg)) {
            errorMsg = rolesToCheck.pop();
        }
        const invalidIDs = rolesToCheck.filter(id => !/^\d{17,19}$/.test(id));
        if (invalidIDs.length > 0) return `[Error: Invalid Role IDs in $onlyForRoles: ${invalidIDs.join(', ')}]`;
        const memberRoles = context.member.roles.cache;
        const hasRequiredRole = rolesToCheck.some(roleId => memberRoles.has(roleId));
        if (!hasRequiredRole) {
            throw new StopExecutionError(errorMsg);
        }
        return "";
    }
};