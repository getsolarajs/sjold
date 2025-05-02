module.exports = {
    name: "$isModeratable",
    description: "Checks if the specified member ID is moderatable by the bot (timeout, etc.). Returns true or false.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $isModeratable requires a guild context]";
        if (!args[0]) return "[Error: $isModeratable requires a member ID]";
        const memberId = args[0];
        try {
            const member = await context.guild.members.fetch(memberId);
            return member.moderatable.toString();
        } catch (err) { return "false"; }
    }
};