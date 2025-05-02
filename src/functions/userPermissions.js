module.exports = {
    name: "$userPermissions",
    description: "Returns semicolon-separated list of author's permissions in current context (channel or guild). Args: [scope=channel];[memberID]",
    takesBrackets: true,
    execute: async (context, args) => {
        const scope = args[0]?.toLowerCase() || 'channel';
        const memberId = args[1]?.trim() || context.member?.id;
        if (!memberId) return "[Error: Cannot determine member to check permissions]";
        if (!context.guild) return "[Error: $userPermissions requires guild context]";
        try {
            const member = await context.guild.members.fetch(memberId);
            if (!member) return `[Error: Member ${memberId} not found]`;
            const perms = (scope === 'channel' && context.channel) ? member.permissionsIn(context.channel) : member.permissions;
            if (!perms) return "[Error: Could not calculate permissions]";
            return perms.toArray().join(';');
        } catch (e) { return `[Error fetching permissions: ${e.message}]`; }
    }
};