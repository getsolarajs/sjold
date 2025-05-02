module.exports = {
    name: "$base64Decode",
    description: "Decodes Base64 text. Args: base64Text",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $base64Decode requires base64 encoded text]";
        try { return Buffer.from(args[0], 'base64').toString('utf8'); }
        catch (e) { return `[Error decoding base64: ${e.message}]`; }
    }
};