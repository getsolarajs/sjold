const StopExecutionError = require('../errors/StopExecutionError');
module.exports = {
    name: "$ignoreChannels",
    description: "Stops execution if the command is used in one of the specified channel IDs. Args: channelID1;[channelID2...]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length === 0) return "[Error: $ignoreChannels requires at least one channel ID]";
        const currentChannelId = context.channel?.id;
        if (!currentChannelId) return "";
        const ignoredIDs = args.filter(id => /^\d{17,19}$/.test(id.trim()));
        if (ignoredIDs.includes(currentChannelId)) {
             throw new StopExecutionError("");
        }
        return "";
    }
};