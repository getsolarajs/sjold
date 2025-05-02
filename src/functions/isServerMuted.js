module.exports = {
    name: "$isServerMuted", description: "Checks if the member is server muted. Args: [memberID]", takesBrackets: true,
    execute: async (context, args) => {
        const memberId = args[0]?.trim() || context.member?.id; if (!memberId) return "[Error: Cannot determine member]";
        if (!context.guild) return "[Error: $isServerMuted requires guild context]";
        try { const member = await context.guild.members.fetch(memberId); return member?.voice?.serverMute?.toString() ?? "false"; }
        catch { return "[Error: Member not found in guild]"; }
    }
};