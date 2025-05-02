module.exports = {
    name: "$endsWith",
    description: "Checks if text ends with a specific string. Returns true or false.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $endsWith requires text and the string to check]";
        return args[0].endsWith(args[1]).toString();
    }
};