module.exports = {
    name: "$changeBotUsername",
    description: "Changes the bot's username. [Rate Limited - Use Sparingly - OWNER ONLY]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $changeBotUsername requires a new username]";
        const newUsername = args[0];
        try {
            await context.client.user.setUsername(newUsername);
            return "";
        } catch (err) {
            console.error("Error changing bot username:", err);
            return `[Error: Failed to change username - ${err.message}]`;
        }
    }
};