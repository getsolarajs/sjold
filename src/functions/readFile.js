const fs = require('fs').promises;
const path = require('path');
module.exports = {
    name: "$readFile",
    description: "Reads content from a file. Args: filePath",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $readFile requires a file path]";
        const filePath = args[0];
        if (filePath.includes('..')) return "[Error: Invalid file path (contains '..')]";

        try {
            const content = await fs.readFile(filePath, 'utf8');
            return content.slice(0, 1900) + (content.length > 1900 ? '...' : '');
        } catch (err) {
            if (err.code === 'ENOENT') return "[Error: File not found]";
            return `[Error reading file: ${err.message}]`;
        }
    }
};