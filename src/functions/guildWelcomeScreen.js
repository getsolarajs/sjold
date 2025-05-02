module.exports = {
    name: "$guildWelcomeScreen", description: "Returns JSON of the welcome screen configuration. Args: [guildID?]", takesBrackets: true,
    execute: async (context, args) => {
        const guildId = args[0]?.trim(); let targetGuild = null; if (guildId) { try { targetGuild = await context.client.guilds.fetch(guildId); } catch { return `[Error: Guild ${guildId} not found]`; } } else { targetGuild = context.guild; } if (!targetGuild) return "[Error: Could not determine guild context]";
        try { if (!targetGuild.members.me?.permissions.has("ManageGuild")) return "[Error: Bot lacks Manage Guild permission]"; const screen = await targetGuild.fetchWelcomeScreen(); return JSON.stringify(screen); }
        catch (e) { if (e.code === 50097) return "[Info: Welcome screen disabled or unavailable]"; return `[Error fetching welcome screen: ${e.message}]`; }
    }
};