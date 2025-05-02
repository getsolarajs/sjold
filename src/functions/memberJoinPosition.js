module.exports = {
    name: "$memberJoinPosition", description: "Gets the join position of a member (Slow on large guilds). Args: [memberID?]", takesBrackets: true,
    execute: async (context, args) => {
        const memberId = args[0]?.trim() || context.member?.id; if (!memberId) return "[Error: Cannot determine member]"; if (!context.guild) return "[Error: Requires guild context]";
        try { await context.guild.members.fetch(); const sortedMembers = [...context.guild.members.cache.values()].sort((a, b) => a.joinedTimestamp - b.joinedTimestamp); const position = sortedMembers.findIndex(m => m.id === memberId) + 1; return position > 0 ? position.toString() : "[Error: Member not found after fetch]"; }
        catch (e) { return `[Error fetching/sorting members: ${e.message}]`; }
    }
};