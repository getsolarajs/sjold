const xml2js = require('xml2js');
const builder = new xml2js.Builder(); // Configure builder
module.exports = {
    name: "$jsonToXml", description: "Converts JSON string to XML string.", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires JSON string]";
        try { const obj = JSON.parse(args[0]); return builder.buildObject(obj); }
        catch (e) { return `[Error building XML: ${e.message}]`; }
    }
};