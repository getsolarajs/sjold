module.exports = {
    name: "$authorID",
    description: "Returns the ID of the command author.",
    takesBrackets: false,
    execute: async (context, args) => {
        const user = context.interaction?.user ?? context.message?.author;
        if (!user) return "[Error: Cannot find command author]";
        return user.id;
    }
};