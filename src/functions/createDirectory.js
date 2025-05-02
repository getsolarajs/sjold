const fs = require('fs').promises;
module.exports = {
    name: "$createDirectory", description: "Creates a directory [SECURITY RISK - OWNER ONLY]. Args: dirPath", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires dirPath]"; const dirPath = args[0];
        if (dirPath.includes('..')) return "[Error: Invalid path]";
        try { await fs.mkdir(dirPath, { recursive: true }); return ""; }
        catch (e) { return `[Error creating directory: ${e.message}]`; }
    }
};