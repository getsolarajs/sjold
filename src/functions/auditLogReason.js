module.exports = {
    name: "$auditLogReason", description: "Sets the reason for the next audit log action in this execution context. Args: reasonText", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $auditLogReason requires reason text]";
        context.auditLogReason = args.join(';'); // Store reason
        return "";
    }
};