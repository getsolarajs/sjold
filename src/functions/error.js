const StopExecutionError = require('../errors/StopExecutionError');
module.exports = {
    name: "$error",
    description: "Stops execution and returns an error message. Args: message",
    takesBrackets: true,
    execute: async (context, args) => {
        const errorMessage = args.join(';') || "Command execution stopped by $error.";
        throw new StopExecutionError(errorMessage);
    }
};