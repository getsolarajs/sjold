module.exports = {
    name: "$clear",
    description: "Bulk deletes messages in the current channel. Args: amount;[filterUserID];[pinned(true/false)]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $clear requires an amount]";
        if (!context.channel || !context.channel.isTextBased() || context.channel.isDMBased()) return "[Error: Requires guild text channel]";
        const amount = parseInt(args[0], 10);
        const filterUserID = args[1]?.trim();
        const filterPinned = args[2]?.toLowerCase() === 'true';

        if (isNaN(amount) || amount < 1 || amount > 100) return "[Error: Amount must be between 1 and 100]";
         if (!context.guild?.members.me?.permissionsIn(context.channel).has("ManageMessages")) return "[Error: Bot lacks Manage Messages permission]";

        try {
             let messages = await context.channel.messages.fetch({ limit: amount });
             if (filterUserID && /^\d{17,19}$/.test(filterUserID)) {
                 messages = messages.filter(m => m.author.id === filterUserID);
             }
             if (!filterPinned) {
                 messages = messages.filter(m => !m.pinned);
             }
             const fourteenDaysAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
             messages = messages.filter(m => m.createdTimestamp > fourteenDaysAgo);

             if (messages.size === 0) return "[Info: No messages found matching criteria to delete]";
             if (messages.size === 1) { 
                  await messages.first().delete();
             } else {
                  await context.channel.bulkDelete(messages, true); 
             }
             return "";
        } catch (err) {
            console.error("Error in $clear:", err);
            return `[Error: Failed to delete messages - ${err.message}]`;
        }
    }
};