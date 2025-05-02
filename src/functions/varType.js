module.exports = {
    name: "$varType", description: "Returns the internal type of a variable's value (string/number/boolean/object/undefined). Args: varName;[scope=local]", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires varName]"; const varName = args[0].trim(); const scope = args[1]?.trim().toLowerCase() || 'local'; let value;
        if (scope === 'local') value = context.localVariables?.get(varName); else if (scope === 'global') value = context.client.variables?.get(varName); else return "[Error: Invalid scope]"; 
        try { const parsed = JSON.parse(value); return typeof parsed; } catch { return typeof value; } // Fallback to typeof string/undefined
    }
};