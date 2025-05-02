module.exports = {
    name: "$shiftList",
    description: "Returns the first item from a list (and conceptually removes it for chained calls - not truly stateful). Args: item1;item2;...",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length === 0) return "";
        return args[0];
    }
};