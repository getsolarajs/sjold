module.exports = {
    name: "$roleCount",
    description: "Returns the total number of roles in the current guild.",
    takesBrackets: false,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $roleCount requires a guild context]";
        return context.guild.roles.cache.size.toString();
    }
};