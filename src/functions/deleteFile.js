const fs = require('fs').promises;
module.exports = {
    name: "$deleteFile", description: "Deletes a file [SECURITY RISK - OWNER ONLY]. Args: filePath", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires filePath]"; const filePath = args[0];
        if (filePath.includes('..')) return "[Error: Invalid path]";
        try { await fs.unlink(filePath); return ""; }
        catch (e) { return `[Error deleting file: ${e.message}]`; }
    }
};