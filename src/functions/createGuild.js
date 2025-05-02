const { GuildFeature } = require('discord.js'); // May need more enums depending on options
module.exports = {
    name: "$createGuild",
    description: "Creates a new guild where the bot is owner. [Rate Limited - Use Sparingly - OWNER ONLY]. Args: name;[region?];[iconURL?];[verificationLevel?];[defaultMessageNotifications?];[explicitContentFilter?];[systemChannelID?];[rulesChannelID?]",
    takesBrackets: true,
    execute: async (context, args) => {
        // SECURITY: Strongly recommend owner check ONLY
        if (!args[0]) return "[Error: Requires guild name]";
        const name = args[0];
        const options = {};
        if (args[1]) options.preferredLocale = args[1]; // Region maps to preferredLocale now
        if (args[2]) options.icon = args[2];
        if (args[3]) options.verificationLevel = parseInt(args[3], 10); // Expect number or enum name later
        if (args[4]) options.defaultMessageNotifications = parseInt(args[4], 10);
        if (args[5]) options.explicitContentFilter = parseInt(args[5], 10);
        if (args[6]) options.systemChannel = args[6];
        if (args[7]) options.rulesChannel = args[7];
        // Note: Cannot set systemChannelFlags or features easily here

        try {
            const newGuild = await context.client.guilds.create(name, options);
            return newGuild.id; // Return ID of the newly created guild
        } catch (err) {
            console.error("Error creating guild:", err);
            return `[Error: Failed to create guild - ${err.message}]`;
        }
    }
};