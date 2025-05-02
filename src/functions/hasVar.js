module.exports = {
    name: "$hasVar",
    description: "Checks if a variable exists. Args: variableName;[scope=local]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $hasVar requires a variableName]";
        const varName = args[0].trim(); const scope = args[1]?.trim().toLowerCase() || 'local';
        let exists = false;
        if (scope === 'local') exists = context.localVariables?.has(varName) ?? false;
        else if (scope === 'global') exists = context.client.variables?.has(varName) ?? false;
        else return "[Error: Invalid scope for $hasVar. Use 'local' or 'global']";
        return exists.toString();
    }
};