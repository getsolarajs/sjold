const { PermissionsBitField } = require('discord.js');
module.exports = {
    name: "$setChannelPerms", description: "Sets permission overwrites for a role/user on a channel. Args: channelID;roleOrUserID;allowPerms;denyPerms;[reason]", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 4) return "[Error: $setChannelPerms requires channelID, targetID, allowPerms (or 'none'), denyPerms (or 'none')]";
        const channelId = args[0]; const targetId = args[1]; const allowStr = args[2]; const denyStr = args[3]; const reason = args[4];
        if (!context.guild) return "[Error: Requires guild context]";
        if (!context.guild.members.me?.permissions.has("ManageRoles")) return "[Error: Bot lacks Manage Roles permission]";
        try {
            const channel = await context.client.channels.fetch(channelId); if (!channel || !channel.permissionOverwrites) return "[Error: Invalid or non-permission channel]";
            const target = await context.guild.roles.fetch(targetId).catch(() => context.guild.members.fetch(targetId).catch(() => null));
            if (!target) return `[Error: Role or User ${targetId} not found]`;
            const parsePerms = (permStr) => { if (!permStr || permStr.toLowerCase() === 'none') return []; const perms = permStr.split(',').map(p => p.trim()).filter(Boolean); const flags = perms.map(p => { const flag = PermissionsBitField.Flags[p]; if (flag === undefined) throw new Error(`Invalid perm: ${p}`); return flag; }); return flags; };
            const allow = parsePerms(allowStr); const deny = parsePerms(denyStr);
            await channel.permissionOverwrites.edit(target.id, { Allow: allow, Deny: deny }, { reason: reason || "Permissions set via bot." });
            return "";
        } catch (e) { return `[Error setting permissions: ${e.message}]`; }
    }
};