module.exports = {
    name: "$isServerDeafened", description: "Checks if the member is server deafened. Args: [memberID]", takesBrackets: true,
    execute: async (context, args) => {
        const memberId = args[0]?.trim() || context.member?.id; if (!memberId) return "[Error: Cannot determine member]";
        if (!context.guild) return "[Error: $isServerDeafened requires guild context]";
        try { const member = await context.guild.members.fetch(memberId); return member?.voice?.serverDeaf?.toString() ?? "false"; }
        catch { return "[Error: Member not found in guild]"; }
    }
};