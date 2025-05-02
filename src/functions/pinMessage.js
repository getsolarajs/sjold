module.exports = {
    name: "$pinMessage", description: "Pins a message in the current channel. Args: messageID", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $pinMessage requires a message ID]";
        const messageId = args[0];
        try {
            const channel = context.channel;
            if (!channel || !channel.messages || channel.isDMBased()) return "[Error: Requires valid guild text channel context]";
            if (!channel.permissionsFor(context.guild?.members.me)?.has("ManageMessages")) return "[Error: Bot lacks Manage Messages permission]";
            const messageToPin = await channel.messages.fetch(messageId);
            if (messageToPin.pinned) return "[Info: Message is already pinned]";
            if (!messageToPin.pinnable) return "[Error: Message cannot be pinned (system message?)]";
            await messageToPin.pin({ reason: context.auditLogReason || "Message pinned via bot" });
            return "";
        } catch (err) {
            if (err.code === 10008) return `[Error: Message ${messageId} not found]`;
            console.error("Error in $pinMessage:", err);
            return `[Error: Failed to pin message ${messageId} - ${err.message}]`;
        }
    }
};