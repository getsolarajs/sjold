module.exports = {
    name: "$urlEncode",
    description: "Encodes text for use in URLs (URIComponent). Args: text",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $urlEncode requires text]";
        return encodeURIComponent(args[0]);
    }
};