const fs = require('fs').promises;
module.exports = {
    name: "$getFileStats", description: "Gets file stats (size, created, modified) as JSON [SECURITY RISK - OWNER ONLY]. Args: filePath", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires filePath]"; const filePath = args[0];
        if (filePath.includes('..')) return "[Error: Invalid path]";
        try { const stats = await fs.stat(filePath); return JSON.stringify({ size: stats.size, created: stats.birthtimeMs, modified: stats.mtimeMs, isFile: stats.isFile(), isDirectory: stats.isDirectory() }); }
        catch (e) { return `[Error getting stats: ${e.message}]`; }
    }
};