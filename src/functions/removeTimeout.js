module.exports = {
    name: "$removeTimeout",
    description: "Removes a timeout from a member in the current guild. Args: memberID;[reason]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $removeTimeout requires a guild context]";
        if (!args[0]) return "[Error: $removeTimeout requires a member ID]";
        const memberId = args[0]; const reason = args.slice(1).join(';');
        try {
            const member = await context.guild.members.fetch(memberId);
            if (!member.moderatable) return "[Error: Bot lacks permission or hierarchy to manage timeout for this member]";
             if (!member.isCommunicationDisabled()) return "[Info: Member is not currently timed out]";
            await member.timeout(null, reason || "Timeout removed."); return "";
        } catch (err) { return `[Error: Failed to remove timeout for member ${memberId} - ${err.message}]`; }
    }
};