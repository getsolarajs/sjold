module.exports = {
    name: "$deafenMemberVoice", description: "Server deafens or un-deafens a member in voice. Args: memberID;deafen(true/false);[reason]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (args.length < 2) return "[Error: Requires memberID and true/false]";
        const memberId = args[0]; const deafen = args[1]?.toLowerCase() === 'true'; const reason = args[2];
        if (!context.guild.members.me?.permissions.has("DeafenMembers")) return "[Error: Bot lacks Deafen Members permission]";
        try { const member = await context.guild.members.fetch(memberId); if (!member.voice.channel) return "[Error: Member not in a voice channel]"; await member.voice.setDeaf(deafen, reason); return ""; }
        catch { return `[Error managing voice deafen for ${memberId}]`; }
    }
};