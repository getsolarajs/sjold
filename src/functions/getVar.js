module.exports = {
    name: "$getVar",
    description: "Gets a variable's value. Args: variableName;[scope=local]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $getVar requires a variableName]";
        const varName = args[0].trim(); const scope = args[1]?.trim().toLowerCase() || 'local';
        let value;
        if (scope === 'local') value = context.localVariables?.get(varName);
        else if (scope === 'global') value = context.client.variables?.get(varName);
        else return "[Error: Invalid scope for $getVar. Use 'local' or 'global']";
        return value !== undefined ? String(value) : "";
    }
};