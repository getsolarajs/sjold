function formatDurationFull(ms) {
    if (ms < 0) ms = 0;
    if (ms < 1000) return "Less than a second";
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds %= 60;
    minutes %= 60;
    const parts = [];
    if (hours > 0) parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
    if (seconds > 0) parts.push(`${seconds} second${seconds > 1 ? 's' : ''}`);
    if (parts.length === 0 && ms > 0) {
        return "Less than a second";
    }
    return parts.join(', ');
}

module.exports = {
    name: "$userActivityDuration",
    description: "Returns duration the user's activity has been running. Args: [userID?; format?] (format: f, h, m, s, ms - defaults to ms)",
    takesBrackets: true,
    execute: async (context, args) => {
        const userIdArg = args[0]?.trim();
        const formatArg = args[1]?.trim().toLowerCase() || 'ms';
        const userId = userIdArg || context.user?.id;
        if (!userId) {
            return "[Error: Cannot determine user]";
        }
        if (!context.guild) {
            return "[Error: Requires guild context]";
        }
        const validFormats = ['f', 'h', 'm', 's', 'ms'];
        const format = validFormats.includes(formatArg) ? formatArg : 'ms';
        try {
            const member = await context.guild.members.fetch(userId).catch(() => null);
            if (!member) return "[Error: User not found in guild]";
            const activity = member.presence?.activities?.[0];
            if (!activity?.createdTimestamp) {
                return "";
            }
            const durationMs = Date.now() - activity.createdTimestamp;
            switch (format) {
                case 'f':
                    return formatDurationFull(durationMs);
                case 'h':
                    return Math.floor(durationMs / (1000 * 60 * 60)).toString();
                case 'm':
                    return Math.floor(durationMs / (1000 * 60)).toString();
                case 's':
                    return Math.floor(durationMs / 1000).toString();
                case 'ms':
                default:
                    return durationMs.toString();
            }
        } catch (err) {
            return "[Error: User/presence unavailable or internal error]";
        }
    }
};