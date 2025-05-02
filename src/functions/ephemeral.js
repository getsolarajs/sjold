module.exports = {
    name: "$ephemeral",
    description: "Marks the interaction response as ephemeral (only works for interactions and before first reply).",
    takesBrackets: false,
    execute: async (context, args) => {
        if (context.interaction && !context.replied && !context.deferred) {
             try {
                 await context.interaction.deferReply({ ephemeral: true });
                 context.deferred = true;
             } catch(e) {
                  console.error("Error deferring ephemerally:", e);
                  return "[Error: Failed to defer ephemeral reply]";
             }
        } else if (context.interaction) {
             console.warn("$ephemeral called after interaction already replied/deferred. May have no effect.");
        } else {
             return "[Error: $ephemeral can only be used with interactions]";
        }
        return "";
    }
};