module.exports = {
    name: "$timeout",
    description: "Times out a member in the current guild. Args: memberID;durationMs;[reason]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $timeout requires a guild context]";
        if (args.length < 2) return "[Error: $timeout requires memberID and durationMs]";
        const memberId = args[0]; const durationMs = parseInt(args[1], 10);
        const reason = args.slice(2).join(';');
        if (isNaN(durationMs) || durationMs <= 0 || durationMs > 2419200000) return "[Error: Invalid durationMs for $timeout (must be > 0 and <= 2419200000)]";
        try {
            const member = await context.guild.members.fetch(memberId);
            if (!member.moderatable) return "[Error: Bot lacks permission or hierarchy to timeout this member]";
            await member.timeout(durationMs, reason || "No reason provided."); return "";
        } catch (err) { return `[Error: Failed to timeout member ${memberId} - ${err.message}]`; }
    }
};