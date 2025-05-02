module.exports = {
    name: "$deleteChannel",
    description: "Deletes a channel in the current guild. Args: channelID;[reason]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $deleteChannel requires a guild context]";
        if (!args[0]) return "[Error: $deleteChannel requires a channel ID]";
        const channelId = args[0]; const reason = args.slice(1).join(';');
        try {
            if (!context.guild.members.me?.permissions.has("ManageChannels")) return "[Error: Bot lacks Manage Channels permission]";
            const channelToDelete = await context.guild.channels.fetch(channelId);
            if (!channelToDelete) return `[Error: Channel with ID ${channelId} not found]`;
            await channelToDelete.delete(reason || "Channel deleted via bot."); return "";
        } catch (err) { return `[Error: Failed to delete channel ${channelId} - ${err.message}]`; }
    }
};