module.exports = {
    name: "$isValidInvite", description: "Checks if an invite code is valid. Args: inviteCode", takesBrackets: true,
    execute: async (context, args) => { if (!args[0]) return "false"; const code = args[0]; try { await context.client.fetchInvite(code); return "true"; } catch { return "false"; } }
};