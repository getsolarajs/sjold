module.exports = {
    name: "$memberJoinedDate",
    description: "Returns the timestamp (in ms) when the author or specified member ID joined the server.",
    takesBrackets: true,
    execute: async (context, args) => {
        const memberId = args[0]?.trim();
        let targetMember = null;
        if (!context.guild) return "[Error: $memberJoinedDate requires a guild context]";
        if (memberId) {
            try { targetMember = await context.guild.members.fetch(memberId); }
            catch (e) { return `[Error: Could not find member with ID ${memberId} in this guild]`; }
        } else {
            targetMember = context.member;
        }
        if (targetMember?.joinedTimestamp) return targetMember.joinedTimestamp.toString();
        if (targetMember) return "[Error: Could not retrieve join timestamp for member]";
        return "[Error: $memberJoinedDate - Could not determine member context or fetch member by ID]";
    }
};