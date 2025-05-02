module.exports = {
    name: "$moveMemberVoice", description: "Moves a member to another voice channel. Args: memberID;channelID;[reason]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (args.length < 2) return "[Error: Requires memberID and channelID]";
        const memberId = args[0]; const channelId = args[1]; const reason = args[2];
        if (!context.guild.members.me?.permissions.has("MoveMembers")) return "[Error: Bot lacks Move Members permission]";
        try { const member = await context.guild.members.fetch(memberId); if (!member.voice.channel) return "[Error: Member not currently in a voice channel]"; const targetChannel = await context.client.channels.fetch(channelId); if (!targetChannel || !targetChannel.isVoiceBased()) return "[Error: Target channel not found or not a voice channel]"; await member.voice.setChannel(targetChannel, reason); return ""; }
        catch { return `[Error moving member ${memberId}]`; }
    }
};