const StopExecutionError = require('../errors/StopExecutionError');
module.exports = {
    name: "$ignoreUsers",
    description: "Stops execution if the author is one of the specified user IDs. Args: userID1;[userID2...]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length === 0) return "[Error: $ignoreUsers requires at least one user ID]";
        const authorId = context.interaction?.user?.id ?? context.message?.author?.id;
        if (!authorId) return "";
        const ignoredIDs = args.filter(id => /^\d{17,19}$/.test(id.trim()));
        if (ignoredIDs.includes(authorId)) {
             throw new StopExecutionError("");
        }
        return "";
    }
};