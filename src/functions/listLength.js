module.exports = {
    name: "$listLength",
    description: "Returns the number of items provided as arguments (alias for $itemCount).",
    takesBrackets: true,
    execute: async (context, args) => {
        return args.length.toString();
    }
};