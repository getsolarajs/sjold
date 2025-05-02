module.exports = {
    name: "$serverID",
    description: "Returns the ID of the current guild or the guild specified by ID.",
    takesBrackets: true,
    execute: async (context, args) => {
        const guildId = args[0]?.trim();
        if (guildId) {
             if (/^\d{17,19}$/.test(guildId)) return guildId;
             return "[Error: Invalid ID format provided to $serverID]";
        } else if (context.guild) {
            return context.guild.id;
        }
        return "[Error: $serverID - Not in a guild context and no ID provided]";
    }
};