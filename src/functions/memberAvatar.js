module.exports = {
    name: "$memberAvatar",
    description: "Returns the server-specific avatar URL of the author or specified member ID, falls back to user avatar.",
    takesBrackets: true,
    execute: async (context, args) => {
        const memberId = args[0]?.trim(); let targetMember = null;
        if (!context.guild) return "[Error: $memberAvatar requires a guild context]";
        if (memberId) { try { targetMember = await context.guild.members.fetch(memberId); } catch (e) { return `[Error: Member ${memberId} not found]`; } }
        else { targetMember = context.member; }
        if (targetMember) return targetMember.displayAvatarURL({ dynamic: true, size: 4096 });
        return "[Error: $memberAvatar - Could not determine member]";
    }
};