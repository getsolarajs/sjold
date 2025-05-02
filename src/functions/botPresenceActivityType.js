const { ActivityType } = require('discord.js');
module.exports = {
    name: "$botPresenceActivityType", description: "Returns the type of the bot's current primary activity.", takesBrackets: false,
    execute: async (context, args) => { const activity = context.client.user?.presence?.activities?.[0]; return activity ? ActivityType[activity.type] : "None"; }
};