module.exports = {
    name: "$urlDecode",
    description: "Decodes URL-encoded text (URIComponent). Args: encodedText",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $urlDecode requires encoded text]";
        try { return decodeURIComponent(args[0]); }
        catch(e) { return `[Error decoding URL: ${e.message}]`; }
    }
};