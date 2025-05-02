module.exports = {
    name: "$botTyping",
    description: "Makes the bot appear as typing in the current channel. Duration is temporary.",
    takesBrackets: false,
    execute: async (context, args) => {
        if (context.channel) {
            try { await context.channel.sendTyping(); }
            catch (e) { console.warn(`$botTyping: Failed to send typing indicator: ${e.message}`); }
        } else {
            return "[Error: Cannot determine channel context for $botTyping]";
        }
        return "";
    }
};