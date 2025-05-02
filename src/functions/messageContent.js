module.exports = {
    name: "$messageContent", description: "Returns the raw content of the command arguments. Args: [index?]", takesBrackets: true,
    execute: async (context, args) => {
        const argIndexStr = args[0]?.trim();
        const commandArgs = context.args || [];
        if (argIndexStr) { const index = parseInt(argIndexStr, 10); if (isNaN(index) || index < 1) return "[Error: Invalid index for $messageContent]"; return commandArgs[index - 1] || ""; }
        else { return commandArgs.join(" "); }
    }
};