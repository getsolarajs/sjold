module.exports = {
    name: "$updateCommands",
    description: "Reloads all commands from the filesystem. [OWNER ONLY]",
    takesBrackets: false,
    execute: async (context, args) => {
        if (!context.client.commandsPath) return "[Error: Command path not configured on client]";
        try {
            context.client.loadCommands(context.client.commandsPath);
            const count = context.client.commands.size;
            return `✅ Successfully reloaded ${count} command triggers.`;
        } catch (error) { return `❌ Failed to reload commands: ${error.message}`; }
    }
};