const fs = require('fs').promises;
module.exports = {
    name: "$listFiles", description: "Lists files/dirs in a directory [SECURITY RISK - OWNER ONLY]. Args: dirPath", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires dirPath]"; const dirPath = args[0];
        if (dirPath.includes('..')) return "[Error: Invalid path]";
        try { const files = await fs.readdir(dirPath); return files.join(';'); }
        catch (e) { return `[Error listing files: ${e.message}]`; }
    }
};