module.exports = {
    name: "$accountCreatedDate",
    description: "Returns the timestamp (in ms) when the author's or specified user ID's account was created.",
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
        if (targetUser) return targetUser.createdTimestamp.toString();
        return "[Error: $accountCreatedDate - Could not determine user context or fetch user by ID]";
    }
};