module.exports = {
    name: "$lowestRole",
    description: "Returns the ID of the lowest role (excluding @everyone) for the specified member or the author.",
    takesBrackets: true,
    execute: async (context, args) => {
        const memberId = args[0]?.trim();
        let targetMember = null;
        if (!context.guild) return "[Error: $lowestRole requires a guild context]";
        if (memberId) {
            try { targetMember = await context.guild.members.fetch(memberId); }
            catch (e) { return `[Error: Could not find member with ID ${memberId} in this guild]`; }
        } else {
            targetMember = context.member;
        }
        if (targetMember) {
             const lowestRole = targetMember.roles.cache
                 .filter(role => role.id !== context.guild.id)
                 .sort((a, b) => a.position - b.position)
                 .first();
            return lowestRole ? lowestRole.id : "";
        }
        return "[Error: $lowestRole - Could not determine member context or fetch member by ID]";
    }
};