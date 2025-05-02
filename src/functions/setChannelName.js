module.exports = {
    name: "$setChannelName",
    description: "Changes the name of a channel. Args: channelID;newName;[reason]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $setChannelName requires a guild context]";
        if (args.length < 2) return "[Error: $setChannelName requires channelID and newName]";
        const channelId = args[0]; const newName = args[1]; const reason = args.slice(2).join(';');
        try {
            if (!context.guild.members.me?.permissions.has("ManageChannels")) return "[Error: Bot lacks Manage Channels permission]";
            const channelToEdit = await context.guild.channels.fetch(channelId);
            if (!channelToEdit) return `[Error: Channel with ID ${channelId} not found]`;
            await channelToEdit.setName(newName, reason || "Channel name changed via bot."); return "";
        } catch (err) { return `[Error: Failed to set name for channel ${channelId} - ${err.message}]`; }
    }
};