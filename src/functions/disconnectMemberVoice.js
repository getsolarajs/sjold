module.exports = {
    name: "$disconnectMemberVoice", description: "Disconnects a member from their voice channel. Args: memberID;[reason]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (!args[0]) return "[Error: Requires memberID]";
        const memberId = args[0]; const reason = args[1];
        if (!context.guild.members.me?.permissions.has("MoveMembers")) return "[Error: Bot lacks Move Members permission]"; // Move perm often covers disconnect
        try { const member = await context.guild.members.fetch(memberId); if (!member.voice.channel) return "[Info: Member not in a voice channel]"; await member.voice.disconnect(reason); return ""; }
        catch { return `[Error disconnecting member ${memberId}]`; }
    }
};