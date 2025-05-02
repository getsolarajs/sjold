module.exports = {
    name: "$memberTimeoutEndTimestamp", description: "Returns the timestamp (ms) when a member's timeout ends. Args: [memberID]", takesBrackets: true,
    execute: async (context, args) => {
        const memberId = args[0]?.trim() || context.member?.id; if (!memberId) return "[Error: Cannot determine member]";
        if (!context.guild) return "[Error: $memberTimeoutEnd requires guild context]";
        try { const member = await context.guild.members.fetch(memberId); return member?.communicationDisabledUntilTimestamp?.toString() || ""; }
        catch { return "[Error: Member not found]"; }
    }
};