module.exports = {
    name: "$messageGuildID", description: "Alias for $guildID, specifically for the message's guild.", takesBrackets: false,
    execute: async (context, args) => { return context.message?.guildId || context.guild?.id || ""; }
};