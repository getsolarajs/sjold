module.exports = {
    name: "$isBot",
    description: "Checks if the author or specified user ID is a bot. Returns true or false.",
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
        if (targetUser) return targetUser.bot.toString();
        return "[Error: $isBot - Could not determine user context or fetch user by ID]";
    }
};