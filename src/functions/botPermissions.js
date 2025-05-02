module.exports = {
    name: "$botPermissions",
    description: "Returns semicolon-separated list of bot's permissions in current context (channel or guild). Args: [scope=channel]",
    takesBrackets: true,
    execute: async (context, args) => {
        const scope = args[0]?.toLowerCase() || 'channel';
        if (!context.guild) return "[Error: $botPermissions requires guild context]";
        const botMember = context.guild.members.me;
        if (!botMember) return "[Error: Could not find bot member]";
        const perms = (scope === 'channel' && context.channel) ? botMember.permissionsIn(context.channel) : botMember.permissions;
        if (!perms) return "[Error: Could not calculate permissions]";
        return perms.toArray().join(';');
    }
};