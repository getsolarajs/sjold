module.exports = {
    name: "$userAccentColor", description: "Returns the hex accent color of the specified user or the author.", takesBrackets: true,
    execute: async (context, args) => {
        const userId = args[0]?.trim(); let targetUser = null;
        if (userId) { try { targetUser = await context.client.users.fetch(userId, { force: true }); } catch { return `[Error: User ${userId} not found]`; } }
        else { targetUser = context.interaction?.user ?? context.message?.author; if (targetUser && targetUser.accentColor === undefined) { try { targetUser = await targetUser.fetch({ force: true }); } catch { return "[Error: Could not fetch author data]"; } } }
        if (targetUser) return targetUser.hexAccentColor || ""; // Returns hex or null -> empty string
        return "[Error: $userAccentColor - Could not determine user]";
    }
};