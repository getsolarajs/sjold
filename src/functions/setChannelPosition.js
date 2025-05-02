module.exports = {
    name: "$setChannelPosition", description: "Sets channel position. Args: channelID;newPosition;[reason?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (args.length < 2) return "[Error: Requires channelID and newPosition]";
        const channelId = args[0]; const newPosition = parseInt(args[1], 10); const reason = args[2]; if (isNaN(newPosition) || newPosition < 0) return "[Error: Invalid position]";
        try { if (!context.guild.members.me?.permissions.has("ManageChannels")) return "[Error: Bot lacks Manage Channels permission]"; const channel = await context.client.channels.fetch(channelId); if (!channel || channel.guild?.id !== context.guild.id) return "[Error: Channel not found in this guild]"; await channel.setPosition(newPosition, { reason: reason || "Position set via bot" }); return ""; }
        catch (e) { return `[Error setting channel position: ${e.message}]`; }
    }
};