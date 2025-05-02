module.exports = {
    name: "$isVerifiedBot", description: "Checks if the bot is verified. Returns true or false.", takesBrackets: false,
    execute: async (context, args) => { return context.client.user?.verified?.toString() ?? "false"; }
};