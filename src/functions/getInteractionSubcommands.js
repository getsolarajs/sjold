module.exports = {
    name: "$getInteractionSubcommand",
    description: "Returns the name of the used subcommand, if any.",
    takesBrackets: false,
    execute: async (context, args) => {
        if (!context.interaction || !context.options) return "[Error: Requires interaction context]";
        try {
            return context.options.getSubcommand(false) || "";
        } catch { return ""; }
    }
};