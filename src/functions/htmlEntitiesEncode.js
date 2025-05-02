const he = require('he');
module.exports = {
    name: "$htmlEntitiesEncode", description: "Encodes text into HTML entities. Args: text", takesBrackets: true,
    execute: async (context, args) => { if (!args[0]) return ""; try { return he.encode(args[0], { useNamedReferences: true }); } catch { return "[Error encoding HTML]"; } }
};