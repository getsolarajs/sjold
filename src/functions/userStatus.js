module.exports = {
    name: "$userStatus",
    description: "Returns the status (online, idle, dnd, offline) of the specified user or the author.",
    takesBrackets: true,
    execute: async (context, args) => {
        const userId = args[0]?.trim();
        let targetMember = null;
        const guild = context.guild;
        if (!guild) return "[Error: $userStatus requires a guild context to check presence]";
        if (userId) {
            try { targetMember = await guild.members.fetch(userId); }
            catch (e) {
                 const user = context.client.users.cache.get(userId);
                 return user?.presence?.status ?? "offline";
            }
        } else {
            targetMember = context.member;
        }
        if (targetMember?.presence) return targetMember.presence.status;
        if (targetMember) return "offline";
        const user = context.client.users.cache.get(userId || context.user?.id);
        return user?.presence?.status ?? "offline";
    }
};