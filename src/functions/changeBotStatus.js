const { ActivityType } = require('discord.js');
module.exports = {
    name: "$changeBotStatus",
    description: "Changes the bot's presence (status, activity). Args: status(online/idle/dnd);activityType(Playing/Watching/Listening/Competing);activityName;[streamURL]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 3) return "[Error: $changeBotStatus requires status, activityType, and activityName]";
        const status = args[0]?.toLowerCase();
        const typeArg = args[1]?.toLowerCase();
        const name = args[2];
        const url = args[3]; 

        let activityType;
        switch(typeArg) {
             case 'playing': activityType = ActivityType.Playing; break;
             case 'watching': activityType = ActivityType.Watching; break;
             case 'listening': activityType = ActivityType.Listening; break;
             case 'competing': activityType = ActivityType.Competing; break;
             case 'streaming': activityType = ActivityType.Streaming; break;
             default: return `[Error: Invalid activityType "${args[1]}"]`;
        }
        if (!['online', 'idle', 'dnd', 'invisible'].includes(status)) return `[Error: Invalid status "${args[0]}"]`;

        const activity = { name: name, type: activityType };
        if (activityType === ActivityType.Streaming && url) {
            activity.url = url;
        } else if (activityType === ActivityType.Streaming && !url) {
            return "[Error: Streaming activity type requires a stream URL]";
        }

        try {
            context.client.user.setPresence({ activities: [activity], status: status });
            return "";
        } catch (err) {
             console.error("Error setting bot presence:", err);
             return `[Error: Failed to set presence - ${err.message}]`;
        }
    }
};