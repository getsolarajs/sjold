module.exports = {
    name: "$isKickable",
    description: "Checks if the specified member ID is kickable by the bot in the current guild. Returns true or false.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $isKickable requires a guild context]";
        if (!args[0]) return "[Error: $isKickable requires a member ID]";
        const memberId = args[0];
        try {
            const member = await context.guild.members.fetch(memberId);
            return member.kickable.toString();
        } catch (err) { return "false"; }
    }
};