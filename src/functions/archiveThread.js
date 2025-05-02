module.exports = {
    name: "$archiveThread",
    description: "Archives the current or specified thread ID. Args: [threadID];[reason]",
    takesBrackets: true,
    execute: async (context, args) => {
        const threadId = args[0]?.trim() || context.channel?.id;
        const reason = args.slice(1).join(';');
        if (!threadId) return "[Error: $archiveThread requires thread context or ID]";
        try {
            const thread = await context.client.channels.fetch(threadId);
            if (!thread || !thread.isThread()) return `[Error: Channel ${threadId} not found or not thread]`;
            if (thread.archived) return "[Info: Thread already archived]";
            if (!thread.manageable) return "[Error: Bot lacks permission to manage thread]";
            await thread.setArchived(true, reason || "Thread archived via bot.");
            return "";
        } catch (err) { return `[Error: Failed to archive thread ${threadId} - ${err.message}]`; }
    }
};