module.exports = {
    name: "$pruneMembers", description: "Prunes inactive members. Args: days;[computeCount?=false];[rolesJson?];[reason?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (!args[0]) return "[Error: Requires number of days (1-30)]";
        const days = parseInt(args[0], 10); const computeCount = args[1]?.toLowerCase() === 'true';
        const rolesJson = args[2]; const reason = args[3]; let roles;
        if (isNaN(days) || days < 1 || days > 30) return "[Error: Days must be between 1 and 30]";
        if (rolesJson) { try { roles = JSON.parse(rolesJson); if (!Array.isArray(roles)) throw new Error(); } catch { return "[Error: Invalid roles JSON array]"; } }
        try { if (!context.guild.members.me?.permissions.has("KickMembers")) return "[Error: Bot lacks Kick Members permission]"; // Prune requires Kick
            const prunedCount = await context.guild.members.prune({ days, count: computeCount, roles, reason });
            return computeCount ? `Estimated prune count: ${prunedCount}` : `Prune initiated (members pruned: ${prunedCount ?? 'Unknown - Compute Count was false'})`;
        } catch (e) { return `[Error pruning members: ${e.message}]`; }
    }
};