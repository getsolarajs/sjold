module.exports = {
    name: "$isUndefined", description: "Checks if variable value is undefined. Args: varName;[scope?]", takesBrackets: true,
    execute: async (context, args) => { if (!args[0]) return "[Error: Requires varName]"; const varName = args[0]; const scope = args[1]?.toLowerCase() || 'local'; let value; if (scope === 'local') value = context.localVariables?.get(varName); else if (scope === 'global') value = context.client.variables?.get(varName); else return "[Error: Invalid scope]"; return (value === undefined).toString(); }
};