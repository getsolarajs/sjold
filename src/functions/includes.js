module.exports = {
    name: "$includes",
    description: "Checks if text includes a search string. Returns true or false.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args[0] === undefined || args[1] === undefined) return "[Error: $includes requires text and search arguments]";
        return args[0].includes(args[1]).toString();
    }
};