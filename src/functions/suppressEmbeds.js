module.exports = {
    name: "$suppressEmbeds", description: "Suppresses or unsuppresses embeds on a message. Args: messageID;suppress(true/false)", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $suppressEmbeds requires messageID and true/false]";
        const messageId = args[0]; const suppress = args[1]?.toLowerCase() === 'true';
        const channel = context.channel; if (!channel) return "[Error: Cannot determine channel context]";
        try {
            if (!channel.permissionsFor(context.guild?.members.me)?.has("ManageMessages")) return "[Error: Bot lacks Manage Messages permission]";
            const message = await channel.messages.fetch(messageId);
            if (message.author.id !== context.client.user.id) return "[Error: Can only suppress embeds on bot's own messages]"; // Typically true
            await message.suppressEmbeds(suppress); return "";
        } catch (err) { return `[Error suppressing embeds: ${err.message}]`; }
    }
};