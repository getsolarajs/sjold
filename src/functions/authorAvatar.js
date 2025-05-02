module.exports = {
    name: "$authorAvatar",
    description: "Returns the avatar URL of the command author.",
    takesBrackets: false,
    execute: async (context, args) => {
        const user = context.interaction?.user ?? context.message?.author;
        if (!user) return "[Error: Cannot find command author]";
        return user.displayAvatarURL({ dynamic: true, size: 4096 });
    }
};