module.exports = {
    name: "$muteMemberVoice", description: "Server mutes or un-mutes a member in voice. Args: memberID;mute(true/false);[reason]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (args.length < 2) return "[Error: Requires memberID and true/false]";
        const memberId = args[0]; const mute = args[1]?.toLowerCase() === 'true'; const reason = args[2];
        if (!context.guild.members.me?.permissions.has("MuteMembers")) return "[Error: Bot lacks Mute Members permission]";
        try { const member = await context.guild.members.fetch(memberId); if (!member.voice.channel) return "[Error: Member not in a voice channel]"; await member.voice.setMute(mute, reason); return ""; }
        catch { return `[Error managing voice mute for ${memberId}]`; }
    }
};