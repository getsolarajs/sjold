module.exports = {
    name: "$botPresenceActivityName", description: "Returns the name of the bot's current primary activity.", takesBrackets: false,
    execute: async (context, args) => { return context.client.user?.presence?.activities?.[0]?.name ?? "None"; }
};