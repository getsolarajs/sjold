module.exports = {
    name: "$modifyChannel", description: "Modifies channel properties. Args: channelID;optionsJson;[reason]", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: Requires channelID and optionsJson]";
        const channelId = args[0]; const optionsJson = args[1]; const reason = args[2]; let options;
        try { options = JSON.parse(optionsJson); } catch { return "[Error: Invalid options JSON]"; }
        try { if (!context.guild?.members.me?.permissions.has("ManageChannels")) return "[Error: Bot lacks Manage Channels permission]"; const channel = await context.client.channels.fetch(channelId); if (!channel) return "[Error: Channel not found]"; await channel.edit(options, reason || "Channel modified via bot"); return ""; }
        catch (e) { return `[Error modifying channel ${channelId}: ${e.message}]`; }
    }
};