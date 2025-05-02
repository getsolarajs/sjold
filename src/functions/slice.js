module.exports = {
    name: "$slice",
    description: "Extracts a section of a string. Args: text;startIndex;[endIndex]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "";
        if (!args[1]) return "[Error: $slice requires at least text and startIndex]";
        const text = args[0];
        const start = parseInt(args[1], 10);
        let end = args[2] !== undefined ? parseInt(args[2], 10) : undefined;
        if (isNaN(start)) return "[Error: Invalid startIndex for $slice]";
        if (args[2] !== undefined && isNaN(end)) return "[Error: Invalid endIndex for $slice]";
        return text.slice(start, end);
    }
};