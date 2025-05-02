module.exports = {
    name: "$incVar",
    description: "Increments a numeric variable's value. Args: variableName;[increment=1];[scope=local]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $incVar requires a variableName]";
        const varName = args[0].trim();
        const increment = args[1] ? parseFloat(args[1]) : 1;
        const scope = args[2]?.trim().toLowerCase() || 'local';
        if (isNaN(increment)) return "[Error: Invalid increment value for $incVar]";
        let currentValStr;
        if (scope === 'local') currentValStr = context.localVariables?.get(varName);
        else if (scope === 'global') currentValStr = context.client.variables?.get(varName);
        else return "[Error: Invalid scope for $incVar]";
        const currentVal = parseFloat(currentValStr || "0");
        if (isNaN(currentVal)) return "[Error: Variable to increment is not a number]";
        const newVal = currentVal + increment;
        if (scope === 'local') { if (!context.localVariables) context.localVariables = new Map(); context.localVariables.set(varName, newVal.toString()); }
        else { if (!context.client.variables) context.client.variables = new Collection(); context.client.variables.set(varName, newVal.toString()); }
        return newVal.toString();
    }
};