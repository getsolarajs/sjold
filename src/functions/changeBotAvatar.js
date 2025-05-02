module.exports = {
    name: "$changeBotAvatar",
    description: "Changes the bot's avatar. Args: imageURL or buffer. [Rate Limited - Use Sparingly - OWNER ONLY]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $changeBotAvatar requires an image URL or buffer]";
        const avatar = args[0]; 
        try {
            await context.client.user.setAvatar(avatar);
            return "";
        } catch (err) {
            console.error("Error changing bot avatar:", err);
            return `[Error: Failed to change avatar - ${err.message}]`;
        }
    }
};