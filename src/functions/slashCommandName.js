module.exports = {
    name: "$slashCommandName", 
    description: "Returns the name of the executed slash command.",
    takesBrackets: false,
    execute: async (context, args) => {
        return context.interaction?.commandName || "[Error: Not a slash command interaction]";
    }
};