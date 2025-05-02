const fs = require('fs');
module.exports = {
    name: "$fileExists", description: "Checks if a file or directory exists. Args: filePath", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires filePath]";
        try { return fs.existsSync(args[0]).toString(); }
        catch { return "false"; }
    }
};