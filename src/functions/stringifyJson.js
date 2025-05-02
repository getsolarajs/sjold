module.exports = {
    name: "$stringifyJSON", description: "Converts a local variable (object/array) back to JSON string. Args: varName;[indent?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires varName]"; const varName = args[0]; const indent = args[1] ? parseInt(args[1], 10) : undefined;
        const value = context.localVariables?.get(varName); if (value === undefined) return "[Error: Variable not found]";
        try { return JSON.stringify(value, null, isNaN(indent) ? undefined : indent); } catch (e) { return `[Error stringifying JSON: ${e.message}]`; }
    }
};