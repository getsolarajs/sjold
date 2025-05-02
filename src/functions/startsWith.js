module.exports = {
    name: "$startsWith",
    description: "Checks if text starts with a specific string. Returns true or false.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $startsWith requires text and the string to check]";
        return args[0].startsWith(args[1]).toString();
    }
};