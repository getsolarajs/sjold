module.exports = {
    name: "$messageData", description: "Retrieves data about the last deleted message in the channel (basic snipe). Args: property(content/authorID/authorTag/timestamp/id)", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $messageData requires a property name]";
        if (!context.channel) return "[Error: Cannot determine channel context]";
        const prop = args[0].toLowerCase();
        const sniped = context.client.snipedMessages?.get(context.channel.id);
        if (!sniped) return ""; // No message sniped in this channel recently

        switch(prop) {
            case 'content': return sniped.content || "";
            case 'authorid': return sniped.authorId || "";
            case 'authortag': return sniped.authorTag || "";
            case 'timestamp': return sniped.timestamp?.toString() || "";
            case 'id': return sniped.id || "";
            case 'attachments': return sniped.attachments?.join(';') || "";
            default: return `[Error: Invalid property "${args[0]}" for $messageData]`;
        }
    }
};