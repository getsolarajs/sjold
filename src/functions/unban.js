module.exports = {
    name: "$unban",
    description: "Unbans a user from the current guild. Args: userID;[reason]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $unban requires a guild context]";
        if (!args[0]) return "[Error: $unban requires a user ID]";
        const userId = args[0]; const reason = args.slice(1).join(';');
        try {
             if (!context.guild.members.me?.permissions.has("BanMembers")) return "[Error: Bot lacks Ban Members permission]";
            await context.guild.bans.remove(userId, reason || "No reason provided."); return "";
        } catch (err) {
            if (err.code === 10026) return `[Info: User ${userId} is not banned in this guild]`;
            return `[Error: Failed to unban user ${userId} - ${err.message}]`;
        }
    }
};