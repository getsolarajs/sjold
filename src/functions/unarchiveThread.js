module.exports = {
    name: "$unarchiveThread",
    description: "Unarchives the current or specified thread ID. Args: [threadID];[reason]",
    takesBrackets: true,
    execute: async (context, args) => {
        const threadId = args[0]?.trim() || context.channel?.id;
        const reason = args.slice(1).join(';');
        if (!threadId) return "[Error: $unarchiveThread requires thread context or ID]";
        try {
            const thread = await context.client.channels.fetch(threadId);
            if (!thread || !thread.isThread()) return `[Error: Channel ${threadId} not found or not thread]`;
            if (!thread.archived) return "[Info: Thread already unarchived]";
            if (!thread.manageable) return "[Error: Bot lacks permission to manage thread]";
            await thread.setArchived(false, reason || "Thread unarchived via bot.");
            return "";
        } catch (err) { return `[Error: Failed to unarchive thread ${threadId} - ${err.message}]`; }
    }
};