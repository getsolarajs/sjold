module.exports = {
    name: "$base64Encode",
    description: "Encodes text into Base64. Args: text",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $base64Encode requires text]";
        try { return Buffer.from(args[0], 'utf8').toString('base64'); }
        catch (e) { return `[Error encoding base64: ${e.message}]`; }
    }
};