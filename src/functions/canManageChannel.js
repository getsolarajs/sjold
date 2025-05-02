const { PermissionsBitField } = require('discord.js');
module.exports = {
    name: "$canManageChannel", description: "Checks if the bot (or specified member) can manage a channel. Args: channelID;[memberID?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (!args[0]) return "[Error: Requires channelID]";
        const channelId = args[0]; const memberId = args[1]?.trim() || context.guild.members.me?.id; if (!memberId) return "[Error: Cannot determine member]";
        try { const channel = await context.client.channels.fetch(channelId); if (!channel || !channel.guild) return "false"; const member = await context.guild.members.fetch(memberId); if (!member) return "false"; return channel.manageable && member.permissionsIn(channel).has(PermissionsBitField.Flags.ManageChannels) ? "true" : "false"; } // Basic check
        catch { return "false"; }
    }
};