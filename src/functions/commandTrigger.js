module.exports = {
    name: "$commandTrigger",
    description: "Returns the trigger used for the command (name or alias for messages, command name for interactions).",
    takesBrackets: false,
    execute: async (context, args) => {
        if (context.interaction) {
             return context.interaction.commandName;
        } else if (context.message) {
             const prefix = context.client.SolaraOptions?.prefix || "!";
             const contentWithoutPrefix = context.message.content.slice(prefix.length);
             const trigger = contentWithoutPrefix.trim().split(/ +/)[0];
             return trigger?.toLowerCase() || "";
        }
        return "[Error: Could not determine command trigger]";
    }
};