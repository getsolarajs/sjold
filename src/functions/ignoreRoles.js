const StopExecutionError = require('../errors/StopExecutionError');
module.exports = {
    name: "$ignoreRoles",
    description: "Stops execution if the author has any of the specified role IDs. Args: roleID1;[roleID2...]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length === 0) return "[Error: $ignoreRoles requires at least one role ID]";
        if (!context.member) return "";
        const ignoredIDs = args.filter(id => /^\d{17,19}$/.test(id.trim()));
        const memberRoles = context.member.roles.cache;
        const hasIgnoredRole = ignoredIDs.some(roleId => memberRoles.has(roleId));
        if (hasIgnoredRole) {
             throw new StopExecutionError("");
        }
        return "";
    }
};