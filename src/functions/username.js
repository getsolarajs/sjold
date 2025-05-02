module.exports = {
    name: "$username",
    description: "Returns the username of the command author or the user specified by ID.",
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
        if (targetUser) return targetUser.username;
        return "[Error: $username - Could not determine author context or fetch user by ID]";
    }
};