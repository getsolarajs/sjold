module.exports = {
    name: "$highestRole",
    description: "Returns the ID of the highest role for the specified member or the author in the current guild.",
    takesBrackets: true,
    execute: async (context, args) => {
        const memberId = args[0]?.trim();
        let targetMember = null;
        if (!context.guild) return "[Error: $highestRole requires a guild context]";
        if (memberId) {
            try { targetMember = await context.guild.members.fetch(memberId); }
            catch (e) { return `[Error: Could not find member with ID ${memberId} in this guild]`; }
        } else {
            targetMember = context.member;
        }
        if (targetMember) return targetMember.roles.highest.id;
        return "[Error: $highestRole - Could not determine member context or fetch member by ID]";
    }
};