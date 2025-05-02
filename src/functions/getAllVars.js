module.exports = {
    name: "$getAllVars", description: "Returns JSON string of all vars in scope. Args: [scope=local]", takesBrackets: true,
    execute: async (context, args) => {
        const scope = args[0]?.trim().toLowerCase() || 'local'; let vars = {};
        if (scope === 'local') vars = Object.fromEntries(context.localVariables || new Map());
        else if (scope === 'global') vars = Object.fromEntries(context.client.variables || new Collection());
        else return "[Error: Invalid scope]"; try { return JSON.stringify(vars); } catch { return "{}"; }
    }
};