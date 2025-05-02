module.exports = {
    name: "$addReaction",
    description: "Adds one or more reactions to a message. Args: messageID;emoji1;[emoji2...]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $addReaction requires messageID and at least one emoji]";
        const messageId = args[0];
        const emojis = args.slice(1);
        try {
            const channel = context.channel;
            if (!channel || !channel.isTextBased() || channel.isDMBased()) return "[Error: Requires guild text-based channel context]";
            if (!channel.permissionsFor(context.guild?.members.me)?.has("AddReactions")) return "[Error: Bot lacks Add Reactions permission]";
            if (!channel.permissionsFor(context.guild?.members.me)?.has("ReadMessageHistory")) return "[Error: Bot lacks Read Message History permission]";

            const messageToReact = await channel.messages.fetch(messageId);
            if (!messageToReact) return `[Error: Message ${messageId} not found]`;

            for (const emoji of emojis) {
                const trimmedEmoji = emoji.trim();
                if (!trimmedEmoji) continue; 
                try {
                    await messageToReact.react(trimmedEmoji);
                    await new Promise(resolve => setTimeout(resolve, 350));
                } catch (reactError) {
                    console.warn(`$addReaction: Failed to react with "${trimmedEmoji}": ${reactError.message}`);
                }
            }
            return "";
        } catch (err) {
            if (err.code === 10008) return `[Error: Message ${messageId} not found]`;
            console.error("Error in $addReaction:", err);
            return `[Error: Failed to add reaction(s) to message ${messageId} - ${err.message}]`;
        }
    }
};