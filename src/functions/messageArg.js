module.exports = {
    name: "$messageArg", description: "Returns the argument at the specified 1-based index from a prefix command. Args: index", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $messageArg requires an index]";
        const index = parseInt(args[0], 10);
        const commandArgs = context.args || [];
        if (isNaN(index) || index < 1) return "[Error: $messageArg requires a positive number index]";
        return commandArgs[index - 1] || "";
    }
};