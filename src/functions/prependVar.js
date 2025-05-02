module.exports = {
    name: "$prependVar", description: "Prepends value to a variable. Args: varName;valueToPrepend;[separator=];[scope=local]", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $prependVar requires varName and value]";
        const varName = args[0].trim(); const valueToPrepend = args[1]; const separator = args[2] !== undefined ? args[2] : ""; const scope = args[3]?.trim().toLowerCase() || 'local';
        let currentValStr = ""; if (scope === 'local') currentValStr = context.localVariables?.get(varName) || ""; else if (scope === 'global') currentValStr = context.client.variables?.get(varName) || ""; else return "[Error: Invalid scope]";
        const newVal = valueToPrepend + separator + currentValStr;
        if (scope === 'local') { if (!context.localVariables) context.localVariables = new Map(); context.localVariables.set(varName, newVal); }
        else { if (!context.client.variables) context.client.variables = new Collection(); context.client.variables.set(varName, newVal); }
        return "";
    }
};