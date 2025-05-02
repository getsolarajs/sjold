module.exports = {
    name: "$ban",
    description: "Bans a user from the current guild. Args: userID;[reason];[deleteMessageDays=0]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $ban requires a guild context]";
        if (!args[0]) return "[Error: $ban requires a user ID]";
        const userId = args[0]; const reason = args[1] || "No reason provided.";
        const daysString = args[2]?.trim(); let deleteMessageSeconds = 0;
        if (daysString) {
             const days = parseInt(daysString, 10);
             if (!isNaN(days) && days >= 0 && days <= 7) deleteMessageSeconds = days * 86400;
             else return "[Error: Invalid deleteMessageDays for $ban (must be 0-7)]";
        }
        try {
            if (!context.guild.members.me?.permissions.has("BanMembers")) return "[Error: Bot lacks Ban Members permission]";
            await context.guild.bans.create(userId, { reason: reason, deleteMessageSeconds: deleteMessageSeconds }); return "";
        } catch (err) { return `[Error: Failed to ban user ${userId} - ${err.message}]`; }
    }
};