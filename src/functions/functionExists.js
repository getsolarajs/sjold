module.exports = {
    name: "$functionExists", description: "Checks if a Solara function exists. Args: functionName (with $)", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires function name]"; const funcName = args[0].toLowerCase();
        return context.client.functions.has(funcName).toString();
    }
};