module.exports = {
    name: "$deleteThread",
    description: "Deletes the current or specified thread ID. Args: [threadID];[reason]",
    takesBrackets: true,
    execute: async (context, args) => {
        const threadId = args[0]?.trim() || context.channel?.id;
        const reason = args.slice(1).join(';');
        if (!threadId) return "[Error: $deleteThread requires thread context or ID]";

        try {
             const thread = await context.client.channels.fetch(threadId);
             if (!thread || !thread.isThread()) return `[Error: Channel ${threadId} not found or is not a thread]`;
             if (!thread.manageable) return "[Error: Bot lacks permission to manage this thread]";

             await thread.delete(reason || "Thread deleted via bot.");
             return "";
        } catch (err) {
             console.error("Error in $deleteThread:", err);
             return `[Error: Failed to delete thread ${threadId} - ${err.message}]`;
        }
    }
};