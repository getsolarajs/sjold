module.exports = {
    name: "$isBannable",
    description: "Checks if the specified user ID is bannable by the bot in the current guild. Returns true or false.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $isBannable requires a guild context]";
        if (!args[0]) return "[Error: $isBannable requires a user ID]";
        const userId = args[0];
        try {
             const member = await context.guild.members.fetch(userId).catch(() => null); 
             if (member) return member.bannable.toString();
             return context.guild.members.me?.permissions.has("BanMembers").toString() ?? "false";
        } catch (err) { return "false"; } 
    }
};