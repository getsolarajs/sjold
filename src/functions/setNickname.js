module.exports = {
    name: "$setNickname", description: "Sets a member's nickname. Args: memberID;newNickname;[reason?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (args.length < 2) return "[Error: Requires memberID and newNickname]";
        const memberId = args[0]; const newNickname = args[1] || null; const reason = args[2]; 
        if (newNickname && newNickname.length > 32) return "[Error: Nickname too long (max 32)]";
        try { if (!context.guild.members.me?.permissions.has("ManageNicknames")) return "[Error: Bot lacks Manage Nicknames permission]"; const member = await context.guild.members.fetch(memberId); await member.setNickname(newNickname, reason || "Nickname changed via bot"); return ""; }
        catch (e) { return `[Error setting nickname: ${e.message}]`; }
    }
};