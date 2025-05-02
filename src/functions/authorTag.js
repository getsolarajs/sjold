module.exports = {
    name: "$authorTag", description: "Returns the tag (Username or Username#Discriminator) of the command author.", takesBrackets: false,
    execute: async (context, args) => {
        const user = context.interaction?.user ?? context.message?.author;
        if (!user) return "[Error: Cannot find command author]";
        return user.discriminator === '0' ? user.username : user.tag;
    }
};