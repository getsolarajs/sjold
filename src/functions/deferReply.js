module.exports = {
    name: "$deferReply",
    description: "Defers the interaction reply. Args: [ephemeral(true/false)]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.interaction) return "[Error: $deferReply requires interaction context]";
        if (context.replied || context.deferred) return "[Info: Interaction already replied or deferred]";
        const ephemeral = args[0]?.toLowerCase() === 'true';
        try {
            await context.interaction.deferReply({ ephemeral: ephemeral });
            context.deferred = true;
            return "";
        } catch (e) {
            console.error("$deferReply Error:", e);
            return "[Error: Failed to defer reply]";
        }
    }
};