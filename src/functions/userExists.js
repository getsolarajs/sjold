module.exports = {
    name: "$userExists",
    description: "Checks if a user exists (can be fetched). Args: userID",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $userExists requires a user ID]";
        const userId = args[0]; if (!/^\d{17,19}$/.test(userId)) return "false";
        try { await context.client.users.fetch(userId); return "true"; }
        catch (err) { if (err.code === 10013) return "false"; return "false"; }
    }
};