module.exports = {
    name: "$getPruneCount", description: "Estimates prune count. Args: days;[rolesJson?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (!args[0]) return "[Error: Requires number of days (1-30)]";
        const days = parseInt(args[0], 10); const rolesJson = args[1]; let roles;
        if (isNaN(days) || days < 1 || days > 30) return "[Error: Days must be between 1 and 30]";
        if (rolesJson) { try { roles = JSON.parse(rolesJson); if (!Array.isArray(roles)) throw new Error(); } catch { return "[Error: Invalid roles JSON array]"; } }
        try { if (!context.guild.members.me?.permissions.has("KickMembers")) return "[Error: Bot lacks Kick Members permission]"; const count = await context.guild.members.prune({ days, dry: true, roles }); return count?.toString() ?? "0"; }
        catch (e) { return `[Error getting prune count: ${e.message}]`; }
    }
};