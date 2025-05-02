module.exports = {
    name: "$userID",
    description: "Returns the ID of the command author or the user specified by ID.",
    takesBrackets: true,
    execute: async (context, args) => {
        const userId = args[0]?.trim();
        if (userId) {
             if (/^\d{17,19}$/.test(userId)) return userId;
             return "[Error: Invalid ID format provided to $userID]";
        } else {
            const user = context.interaction?.user ?? context.message?.author;
            if (user) return user.id;
            return "[Error: $userID - Cannot determine author context and no ID provided]";
        }
    }
};