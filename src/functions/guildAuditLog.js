const { AuditLogEvent } = require('discord.js');
module.exports = {
    name: "$guildAuditLog", description: "Fetches audit log entries (JSON). Args: [actionType?];[userID?];[limit=10?];[before?];[after?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (!context.guild.members.me?.permissions.has("ViewAuditLog")) return "[Error: Bot lacks View Audit Log permission]";
        const actionTypeStr = args[0]; const userId = args[1]; const limit = args[2] ? parseInt(args[2], 10) : 10; const before = args[3]; const after = args[4];
        let actionType = null; if (actionTypeStr && AuditLogEvent[actionTypeStr]) actionType = AuditLogEvent[actionTypeStr]; else if (actionTypeStr && !isNaN(parseInt(actionTypeStr))) actionType = parseInt(actionTypeStr); else if (actionTypeStr) return `[Error: Invalid actionType "${actionTypeStr}"]`;
        if (isNaN(limit) || limit < 1 || limit > 100) return "[Error: Invalid limit (1-100)]";
        try { const options = { limit }; if (actionType) options.type = actionType; if (userId) options.user = userId; if (before) options.before = before; if (after) options.after = after; const logs = await context.guild.fetchAuditLogs(options); return JSON.stringify(logs.entries.map(entry => ({ id: entry.id, targetId: entry.targetId, userId: entry.executorId, action: AuditLogEvent[entry.action] ?? entry.action, reason: entry.reason, changes: entry.changes, timestamp: entry.createdTimestamp }))); }
        catch (e) { return `[Error fetching audit logs: ${e.message}]`; }
    }
};