module.exports = {
    name: "$hasRole",
    description: "Checks if the author or specified member ID has a specific role ID in the current guild. Returns true or false.",
    takesBrackets: true,
    execute: async (context, args) => {
        const roleId = args[0]?.trim();
        const memberId = args[1]?.trim();
        if (!context.guild) return "[Error: $hasRole requires a guild context]";
        if (!roleId || !/^\d{17,19}$/.test(roleId)) {
             return "[Error: $hasRole requires a valid role ID as the first argument]";
        }
        let targetMember = null;
        if (memberId) {
            try { targetMember = await context.guild.members.fetch(memberId); }
            catch (e) { return `[Error: Could not find member with ID ${memberId} in this guild]`; }
        } else {
            targetMember = context.member;
        }
        if (targetMember) return targetMember.roles.cache.has(roleId).toString();
        return "[Error: $hasRole - Could not determine member context or fetch member by ID]";
    }
};