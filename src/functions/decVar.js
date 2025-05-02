module.exports = {
    name: "$decVar",
    description: "Decrements a numeric variable's value. Args: variableName;[decrement=1];[scope=local]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $decVar requires a variableName]";
        const varName = args[0].trim();
        const decrement = args[1] ? parseFloat(args[1]) : 1;
        const scope = args[2]?.trim().toLowerCase() || 'local';
        if (isNaN(decrement)) return "[Error: Invalid decrement value for $decVar]";
        let currentValStr;
        if (scope === 'local') currentValStr = context.localVariables?.get(varName);
        else if (scope === 'global') currentValStr = context.client.variables?.get(varName);
        else return "[Error: Invalid scope for $decVar]";
        const currentVal = parseFloat(currentValStr || "0");
        if (isNaN(currentVal)) return "[Error: Variable to decrement is not a number]";
        const newVal = currentVal - decrement;
        if (scope === 'local') { if (!context.localVariables) context.localVariables = new Map(); context.localVariables.set(varName, newVal.toString()); }
        else { if (!context.client.variables) context.client.variables = new Collection(); context.client.variables.set(varName, newVal.toString()); }
        return newVal.toString();
    }
};