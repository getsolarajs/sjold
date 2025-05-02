const StopExecutionError = require('../errors/StopExecutionError');
module.exports = {
    name: "$onlyForIDs",
    description: "Restricts command usage to specified user IDs. Stops execution if check fails. Args: id1;id2;...;[Optional Error Message]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length === 0) throw new StopExecutionError("❌ This command has an incomplete owner restriction.");
        const authorId = context.interaction?.user?.id ?? context.message?.author?.id;
        if (!authorId) throw new StopExecutionError("❌ Could not verify user for restriction.");
        let allowedIDs = [...args];
        let customErrorMessage = `❌ You are not authorized to use this command.`;
        const lastArg = allowedIDs[allowedIDs.length - 1];
        if (allowedIDs.length > 1 && !/^\d{17,19}$/.test(lastArg)) {
            customErrorMessage = allowedIDs.pop();
        }
        const validAllowedIDs = allowedIDs.filter(id => /^\d{17,19}$/.test(id));
        if (!validAllowedIDs.includes(authorId)) {
            throw new StopExecutionError(customErrorMessage);
        }
        return "";
    }
};