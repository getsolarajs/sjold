module.exports = {
    name: "$getInteractionSubcommandGroup",
    description: "Returns the name of the used subcommand group, if any.",
    takesBrackets: false,
    execute: async (context, args) => {
        if (!context.interaction || !context.options) return "[Error: Requires interaction context]";
        try {
            return context.options.getSubcommandGroup(false) || ""; 
        } catch { return ""; }
    }
};