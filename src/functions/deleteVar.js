module.exports = {
    name: "$deleteVar",
    description: "Deletes a variable. Args: variableName;[scope=local]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $deleteVar requires a variableName]";
        const varName = args[0].trim(); const scope = args[1]?.trim().toLowerCase() || 'local';
        let deleted = false;
        if (scope === 'local') deleted = context.localVariables?.delete(varName) ?? false;
        else if (scope === 'global') deleted = context.client.variables?.delete(varName) ?? false;
        else return "[Error: Invalid scope for $deleteVar. Use 'local' or 'global']";
        return "";
    }
};