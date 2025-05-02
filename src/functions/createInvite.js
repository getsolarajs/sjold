module.exports = {
    name: "$createInvite", description: "Creates an invite for a channel. Args: [channelID?];[optionsJson?];[reason?]", takesBrackets: true,
    execute: async (context, args) => {
        const channelId = args[0]?.trim() || context.channel?.id; const optionsJson = args[1]; const reason = args[2]; let options = {};
        if (!channelId) return "[Error: Requires channel context or ID]"; if (!context.guild) return "[Error: Requires guild context]";
        if (optionsJson) { try { options = JSON.parse(optionsJson); } catch { return "[Error: Invalid options JSON]"; } }
        options.reason = reason || "Invite created via bot";
        try { const channel = await context.client.channels.fetch(channelId); if (!channel || !channel.isTextBased() && !channel.isVoiceBased() || !channel.permissionsFor(context.guild.members.me)?.has("CreateInstantInvite")) return "[Error: Cannot create invite for this channel or missing perms]"; const invite = await channel.createInvite(options); return invite.code; }
        catch (e) { return `[Error creating invite: ${e.message}]`; }
    }
};