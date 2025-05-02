const he = require('he');
module.exports = {
    name: "$htmlEntitiesDecode", description: "Decodes HTML entities in text. Args: text", takesBrackets: true,
    execute: async (context, args) => { if (!args[0]) return ""; try { return he.decode(args[0]); } catch { return "[Error decoding HTML]"; } }
};