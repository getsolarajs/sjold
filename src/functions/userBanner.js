module.exports = {
    name: "$userBanner",
    description: "Returns the banner URL of the specified user or the author.",
    takesBrackets: true,
    execute: async (context, args) => {
        const userId = args[0]?.trim();
        let targetUser = null;
        if (userId) {
            try { targetUser = await context.client.users.fetch(userId, { force: true }); } 
            catch (e) { return `[Error: Could not find user with ID ${userId}]`; }
        } else {
             targetUser = context.interaction?.user ?? context.message?.author;
             if (targetUser && targetUser.banner === undefined) {
                  try { targetUser = await targetUser.fetch({ force: true }); }
                  catch (e) { return "[Error: Could not fetch author data]"; }
             }
        }
        if (targetUser) return targetUser.bannerURL({ dynamic: true, size: 4096 }) || "";
        return "[Error: $userBanner - Could not determine user context or fetch user by ID]";
    }
};