module.exports = {
    name: "$kick",
    description: "Kicks a member from the current guild. Args: memberID;[reason]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $kick requires a guild context]";
        if (!args[0]) return "[Error: $kick requires a member ID]";
        const memberId = args[0]; const reason = args.slice(1).join(';');
        try {
            const member = await context.guild.members.fetch(memberId);
            if (!member.kickable) return "[Error: Bot lacks permission or hierarchy to kick this member]";
            await member.kick(reason || "No reason provided."); return "";
        } catch (err) { return `[Error: Failed to kick member ${memberId} - ${err.message}]`; }
    }
};