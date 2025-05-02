module.exports = {
    name: "$createRole",
    description: "Creates a role in the current guild. Args: name;[color];[hoist(true/false)];[mentionable(true/false)];[reason]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: $createRole requires a guild context]";
        if (!args[0]) return "[Error: $createRole requires a role name]";
        const name = args[0]; const color = args[1];
        const hoist = args[2]?.toLowerCase() === 'true';
        const mentionable = args[3]?.toLowerCase() === 'true';
        const reason = args.slice(4).join(';');
        const options = { name: name, reason: reason || "Role created via bot." };
        if (color) options.color = color;
        if (hoist) options.hoist = hoist;
        if (mentionable) options.mentionable = mentionable;
        try {
            if (!context.guild.members.me?.permissions.has("ManageRoles")) return "[Error: Bot lacks Manage Roles permission]";
            const newRole = await context.guild.roles.create(options); return newRole.id;
        } catch (err) { return `[Error: Failed to create role - ${err.message}]`; }
    }
};