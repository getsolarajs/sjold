const fs = require('fs').promises;
module.exports = {
    name: "$appendFile", description: "Appends content to a file [SECURITY RISK - OWNER ONLY]. Args: filePath;content", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: Requires filePath and content]"; const filePath = args[0]; const content = args[1];
        if (filePath.includes('..')) return "[Error: Invalid path]";
        try { await fs.appendFile(filePath, content + '\n', 'utf8'); return ""; } // Add newline for separation
        catch (e) { return `[Error appending file: ${e.message}]`; }
    }
};