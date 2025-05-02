module.exports = {
    name: "$userBadges",
    description: "Returns a semicolon-separated list of badges for the specified user or the author.",
    takesBrackets: true,
    execute: async (context, args) => {
        const userId = args[0]?.trim();
        let targetUser = null;
        if (userId) {
            try { targetUser = await context.client.users.fetch(userId, { force: true }); }
            catch (e) { return `[Error: Could not find user with ID ${userId}]`; }
        } else {
             targetUser = context.interaction?.user ?? context.message?.author;
             if (targetUser && !targetUser.flags) {
                 try { targetUser = await targetUser.fetch({ force: true }); }
                 catch (e) { return "[Error: Could not fetch author flags]"; }
             }
        }
        if (targetUser?.flags) {
             const badges = targetUser.flags.toArray();
             return badges.length > 0 ? badges.join(';') : "None";
        }
        if (targetUser) return "[Error: Could not fetch user flags]";
        return "[Error: $userBadges - Could not determine user context or fetch user by ID]";
    }
};