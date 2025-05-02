const fs = require('fs').promises;
const path = require('path');
module.exports = {
    name: "$writeFile",
    description: "Writes content to a file. Creates directories if needed. Args: filePath;content",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $writeFile requires filePath and content]";
        const filePath = args[0];
        const content = args[1];
        if (filePath.includes('..')) return "[Error: Invalid file path (contains '..')]";

        try {
             const dir = path.dirname(filePath);
             await fs.mkdir(dir, { recursive: true });
             await fs.writeFile(filePath, content, 'utf8');
             return "";
        } catch (err) {
             return `[Error writing file: ${err.message}]`;
        }
    }
};