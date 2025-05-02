module.exports = {
    name: "$substring",
    description: "Returns the part of the string between the start and end indexes (or to the end). Args: text;startIndex;[endIndex]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0] || args[1] === undefined) return "[Error: $substring requires text and startIndex]";
        const text = args[0];
        const start = parseInt(args[1], 10);
        let end = args[2] !== undefined ? parseInt(args[2], 10) : undefined;
        if (isNaN(start)) return "[Error: Invalid startIndex for $substring]";
        if (args[2] !== undefined && isNaN(end)) return "[Error: Invalid endIndex for $substring]";
        return text.substring(start, end);
    }
};