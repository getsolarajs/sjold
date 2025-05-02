const xml2js = require('xml2js');
const parser = new xml2js.Parser({ explicitArray: false }); // Configure parser
module.exports = {
    name: "$xmlToJson", description: "Converts XML string to JSON string.", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires XML string]";
        try { const result = await parser.parseStringPromise(args[0]); return JSON.stringify(result); }
        catch (e) { return `[Error parsing XML: ${e.message}]`; }
    }
};