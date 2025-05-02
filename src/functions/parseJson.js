module.exports = {
    name: "$parseJSON", description: "Parses JSON and stores it in a local variable. Args: varName;jsonString", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: Requires varName and jsonString]"; const varName = args[0]; const jsonString = args[1];
        try { const obj = JSON.parse(jsonString); if (!context.localVariables) context.localVariables = new Map(); context.localVariables.set(varName, obj); return ""; }
        catch (e) { return `[Error: Invalid JSON: ${e.message}]`; }
    }
};