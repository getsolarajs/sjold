module.exports = {
    name: "$botToken",
    description: "Returns a redacted bot token string. [OWNER ONLY]",
    takesBrackets: false,
    execute: async (context, args) => {
        const token = context.client.token || process.env.DISCORD_TOKEN;
        if (token) return token;
        return "[TOKEN NOT AVAILABLE]";
    }
};