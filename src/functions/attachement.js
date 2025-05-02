module.exports = {
    name: "$attachment",
    description: "Returns the URL of the first attachment on the command message. Args: [index=1]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.message) return "[Error: $attachment requires a message context]";
        if (context.message.attachments.size === 0) return "";
        const index = args[0] ? parseInt(args[0], 10) : 1;
        if (isNaN(index) || index < 1) return "[Error: Invalid index for $attachment (must be >= 1)]";
        const attachmentArray = Array.from(context.message.attachments.values());
        if (index > attachmentArray.length) return "";
        return attachmentArray[index - 1].url;
    }
};