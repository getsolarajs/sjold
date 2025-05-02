module.exports = {
    name: "$memberFlags", description: "Returns semicolon-separated list of member flags. Args: [memberID]", takesBrackets: true,
    execute: async (context, args) => {
        const memberId = args[0]?.trim() || context.member?.id; if (!memberId) return "[Error: Cannot determine member]";
        if (!context.guild) return "[Error: $memberFlags requires guild context]";
        try { const member = await context.guild.members.fetch(memberId); return member?.flags?.toArray().join(';') ?? ""; }
        catch { return "[Error: Member not found]"; }
    }
};