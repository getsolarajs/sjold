const { PermissionsBitField } = require('discord.js');
module.exports = {
    name: "$botInviteURL", description: "Generates the bot's invite URL. Args: [permissionBitfield or permName1;permName2...]", takesBrackets: true,
    execute: async (context, args) => {
        let permissions = [];
        if (args.length > 0) {
            if (/^\d+$/.test(args[0])) { permissions = [args[0]]; }
            else { try { permissions = args.map(p => { if (PermissionsBitField.Flags[p]) return PermissionsBitField.Flags[p]; throw new Error(); }); }
                   catch { return "[Error: Invalid permission name(s) provided]"; }
            }
        }
        try { return context.client.generateInvite({ scopes: ['bot', 'applications.commands'], permissions: permissions }); }
        catch (e) { return `[Error generating invite: ${e.message}]`; }
    }
};