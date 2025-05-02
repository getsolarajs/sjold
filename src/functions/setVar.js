module.exports = {
    name: "$setVar",
    description: "Sets a variable's value. Args: variableName;value;[scope=local]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $setVar requires variableName and value]";
        const varName = args[0].trim(); const value = args[1];
        const scope = args[2]?.trim().toLowerCase() || 'local';
        if (!varName) return "[Error: Variable name cannot be empty]";
        if (scope === 'local') {
            if (!context.localVariables) context.localVariables = new Map();
            context.localVariables.set(varName, value);
        } else if (scope === 'global') {
            if (!context.client.variables) context.client.variables = new Collection();
            context.client.variables.set(varName, value);
        } else return "[Error: Invalid scope for $setVar. Use 'local' or 'global']";
        return "";
    }
};