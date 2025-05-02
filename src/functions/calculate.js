const math = require('mathjs');
module.exports = {
    name: "$calculate", description: "Evaluates a mathematical expression. Args: expression", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires mathematical expression]"; const expression = args[0];
        try { const result = math.evaluate(expression); return String(result); } // Use mathjs evaluate
        catch (e) { return `[Calculation Error: ${e.message}]`; }
    }
};