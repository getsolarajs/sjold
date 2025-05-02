module.exports = {
    name: "$fetchMember", description: "Fetches member data and returns as JSON string. Args: userID", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $fetchMember requires guild context]";
        if (!args[0]) return "[Error: Requires user ID]";
        const userId = args[0]; if (!/^\d{17,19}$/.test(userId)) return "[Error: Invalid user ID]";
        try { const member = await context.guild.members.fetch({ user: userId, force: true }); return JSON.stringify(member); }
        catch (e) { if(e.code === 10007) return "[Error: Member not found]"; return `[Error fetching member: ${e.message}]`; }
    }
};