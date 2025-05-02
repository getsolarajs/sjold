module.exports = {
    name: "$boostingSince",
    description: "Returns the timestamp (in ms) when the author or specified member started boosting the server.",
    takesBrackets: true,
    execute: async (context, args) => {
        const memberId = args[0]?.trim();
        let targetMember = null;
        if (!context.guild) return "[Error: $boostingSince requires a guild context]";
        if (memberId) {
            try { targetMember = await context.guild.members.fetch(memberId); }
            catch (e) { return `[Error: Could not find member with ID ${memberId} in this guild]`; }
        } else {
            targetMember = context.member;
        }
        if (targetMember) return targetMember.premiumSinceTimestamp?.toString() || "";
        return "[Error: $boostingSince - Could not determine member context or fetch member by ID]";
    }
};