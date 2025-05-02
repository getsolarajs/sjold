module.exports = {
    name: "$userTag",
    description: "Returns the tag (Username or Username#Discriminator) of the command author or the user specified by ID.",
    takesBrackets: true,
    execute: async (context, args) => {
        const userId = args[0]?.trim();
        let targetUser = null;
        if (userId) {
            try { targetUser = await context.client.users.fetch(userId); }
            catch (e) { return `[Error: Could not find user with ID ${userId}]`; }
        } else {
            targetUser = context.interaction?.user ?? context.message?.author;
        }
        if (targetUser) {
            return targetUser.discriminator === '0' ? targetUser.username : targetUser.tag;
        }
        return "[Error: $userTag - Could not determine author context or fetch user by ID]";
    }
};