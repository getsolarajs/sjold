module.exports = {
    name: "$isBoosting",
    description: "Checks if the author or specified member ID is boosting the current server. Returns true or false.",
    takesBrackets: true,
    execute: async (context, args) => {
        const memberId = args[0]?.trim();
        let targetMember = null;
        if (!context.guild) return "[Error: $isBoosting requires a guild context]";
        if (memberId) {
            try { targetMember = await context.guild.members.fetch(memberId); }
            catch (e) { return `[Error: Could not find member with ID ${memberId} in this guild]`; }
        } else {
            targetMember = context.member;
        }
        if (targetMember) return (!!targetMember.premiumSinceTimestamp).toString();
        return "[Error: $isBoosting - Could not determine member context or fetch member by ID]";
    }
};