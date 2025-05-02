module.exports = {
    name: "$displayName", description: "Returns the display name (nickname or username) of the specified member or the author.", takesBrackets: true,
    execute: async (context, args) => {
        const memberId = args[0]?.trim(); let targetMember = null;
        if (!context.guild) return "[Error: $displayName requires guild context]";
        if (memberId) { try { targetMember = await context.guild.members.fetch(memberId); } catch { return `[Error: Member ${memberId} not found]`; } }
        else { targetMember = context.member; }
        if (targetMember) return targetMember.displayName;
        return "[Error: Could not determine member]";
    }
};