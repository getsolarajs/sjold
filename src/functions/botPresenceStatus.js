module.exports = {
    name: "$botPresenceStatus", description: "Returns the bot's current presence status (online, idle, dnd, invisible).", takesBrackets: false,
    execute: async (context, args) => { return context.client.user?.presence?.status ?? "offline"; }
};