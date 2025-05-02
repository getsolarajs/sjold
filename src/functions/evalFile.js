const fs = require('fs').promises;
const StopExecutionError = require('../errors/StopExecutionError');
module.exports = {
    name: "$evalFile", description: "Reads and executes Solara code from a file. [SECURITY RISK - OWNER ONLY]. Args: filePath", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires filePath]"; const filePath = args[0];
        if (filePath.includes('..')) return "[Error: Invalid path]";
        try { const codeToParse = await fs.readFile(filePath, 'utf8'); if (!codeToParse) return "[Error: File is empty]"; return await context.client.functionParser.parse(codeToParse, context); }
        catch (error) { if (error instanceof StopExecutionError) throw error; if (error.code === 'ENOENT') return "[Error: File not found]"; return `[Eval File Error: ${error.message || error}]`; }
    }
};