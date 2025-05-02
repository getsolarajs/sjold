module.exports = {
    name: "$lockThread",
    description: "Locks the current or specified thread ID. Args: [threadID];[reason]",
    takesBrackets: true,
    execute: async (context, args) => {
        const threadId = args[0]?.trim() || context.channel?.id;
        const reason = args.slice(1).join(';');
        if (!threadId) return "[Error: $lockThread requires thread context or ID]";
        try {
            const thread = await context.client.channels.fetch(threadId);
            if (!thread || !thread.isThread()) return `[Error: Channel ${threadId} not found or not thread]`;
            if (thread.locked) return "[Info: Thread already locked]";
            if (!thread.manageable) return "[Error: Bot lacks permission to manage thread]";
            await thread.setLocked(true, reason || "Thread locked via bot.");
            return "";
        } catch (err) { return `[Error: Failed to lock thread ${threadId} - ${err.message}]`; }
    }
};