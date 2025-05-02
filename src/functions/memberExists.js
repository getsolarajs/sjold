module.exports = {
    name: "$memberExists", description: "Alias for $userExistsInGuild.", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $memberExists requires a guild context]";
        if (!args[0]) return "[Error: $memberExists requires a user ID]";
        const userId = args[0]; if (!/^\d{17,19}$/.test(userId)) return "false";
        try { await context.guild.members.fetch(userId); return "true"; }
        catch (err) { if (err.code === 10007) return "false"; return "false"; }
    }
};