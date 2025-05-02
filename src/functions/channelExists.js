module.exports = {
    name: "$channelExists",
    description: "Checks if a channel exists (can be fetched). Args: channelID",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $channelExists requires a channel ID]";
        const channelId = args[0]; if (!/^\d{17,19}$/.test(channelId)) return "false";
        try { await context.client.channels.fetch(channelId); return "true"; }
        catch (err) { if (err.code === 10003) return "false"; return "false"; }
    }
};