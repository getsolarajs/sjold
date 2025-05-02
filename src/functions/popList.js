module.exports = {
    name: "$popList",
    description: "Returns the last item from a list. Args: item1;item2;...",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length === 0) return "";
        return args[args.length - 1];
    }
};