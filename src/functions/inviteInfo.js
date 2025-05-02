module.exports = {
    name: "$inviteInfo",
    description: "Fetches info about an invite code. Args: inviteCode;property(guildID/guildName/channelID/channelName/inviterID/inviterTag/uses/maxUses/expiresTimestamp/code)",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $inviteInfo requires inviteCode and property]";
        const code = args[0];
        const prop = args[1].toLowerCase();

        try {
            const invite = await context.client.fetchInvite(code, { withCounts: true, withExpiration: true });

            switch(prop) {
                case 'guildid': return invite.guild?.id || "";
                case 'guildname': return invite.guild?.name || "";
                case 'channelid': return invite.channel?.id || "";
                case 'channelname': return invite.channel?.name || "";
                case 'inviterid': return invite.inviter?.id || "";
                case 'invitertag': return invite.inviter ? (invite.inviter.discriminator === '0' ? invite.inviter.username : invite.inviter.tag) : "";
                case 'uses': return invite.uses?.toString() ?? "N/A"; 
                case 'maxuses': return invite.maxUses?.toString() ?? "0";
                case 'expirestimestamp': return invite.expiresTimestamp?.toString() ?? "";
                case 'code': return invite.code;
                default: return `[Error: Invalid property "${args[1]}" for $inviteInfo]`;
            }
        } catch (err) {
            if (err.code === 10006) return `[Error: Invite code "${code}" is invalid or expired]`;
            console.error(`Error fetching invite ${code}:`, err);
            return `[Error: Failed to fetch invite info - ${err.message}]`;
        }
    }
};