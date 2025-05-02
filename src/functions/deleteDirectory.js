const fs = require('fs').promises;
module.exports = {
    name: "$deleteDirectory", description: "Deletes a directory [SECURITY RISK - OWNER ONLY]. Args: dirPath;[recursive?=false]", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires dirPath]"; const dirPath = args[0]; const recursive = args[1]?.toLowerCase() === 'true';
        if (dirPath.includes('..') || dirPath === '/' || dirPath === '.' || dirPath === './') return "[Error: Invalid/Dangerous path]";
        try { await fs.rm(dirPath, { recursive: recursive, force: recursive }); return ""; } // force recommended with recursive
        catch (e) { return `[Error deleting directory: ${e.message}]`; }
    }
};