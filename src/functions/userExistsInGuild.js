module.exports = {
    name: "$userExistsInGuild",
    description: "Checks if a user ID exists in the current guild. Args: userID",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $userExistsInGuild requires a guild context]";
        if (!args[0]) return "[Error: $userExistsInGuild requires a user ID]";
        const userId = args[0];
        if (!/^\d{17,19}$/.test(userId)) return "false";
        try {
            await context.guild.members.fetch(userId); 
            return "true";
        } catch (err) {
            if (err.code === 10007) return "false";
            console.warn(`Error checking member existence ${userId} in guild ${context.guild.id}: ${err.message}`);
            return "false";
        }
    }
};