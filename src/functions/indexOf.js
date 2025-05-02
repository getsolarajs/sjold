module.exports = {
    name: "$indexOf",
    description: "Returns the first index at which a given element can be found in the string, or -1. Args: text;searchValue;[fromIndex=0]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $indexOf requires text and searchValue]";
        const text = args[0]; const searchValue = args[1];
        const fromIndex = args[2] ? parseInt(args[2], 10) : 0;
        if (isNaN(fromIndex)) return "[Error: Invalid fromIndex for $indexOf]";
        return text.indexOf(searchValue, fromIndex).toString();
    }
};