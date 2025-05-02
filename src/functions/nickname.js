module.exports = {
    name: "$nickname",
    description: "Returns the nickname of the command author or the specified member ID in the current guild.",
    takesBrackets: true,
    execute: async (context, args) => {
        const memberId = args[0]?.trim();
        let targetMember = null;
        if (!context.guild) return "[Error: $nickname requires a guild context]";
        if (memberId) {
            try { targetMember = await context.guild.members.fetch(memberId); }
            catch (e) { return `[Error: Could not find member with ID ${memberId} in this guild]`; }
        } else {
            targetMember = context.member;
        }
        if (targetMember) return targetMember.nickname || targetMember.user.username;
        return "[Error: $nickname - Could not determine member context or fetch member by ID]";
    }
};