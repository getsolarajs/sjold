module.exports = {
    name: "$modifyGuild",
    description: "Modifies guild properties. Args: guildID;optionsJson;[reason?]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: Requires guildID and optionsJson]";
        const guildId = args[0];
        const optionsJson = args[1];
        const reason = args[2];
        let options;

        if (!/^\d{17,19}$/.test(guildId)) return "[Error: Invalid guildID format]";
        try { options = JSON.parse(optionsJson); }
        catch { return "[Error: Invalid options JSON]"; }

        try {
            // Check bot permissions in *that* guild, not necessarily current context guild
            const guild = await context.client.guilds.fetch(guildId);
            if (!guild) return "[Error: Bot is not in the specified guild]";
            const botMember = await guild.members.fetch(context.client.user.id);
            if (!botMember?.permissions.has("ManageGuild")) return "[Error: Bot lacks Manage Guild permission in the target guild]";

            const modifiedGuild = await guild.edit(options, { reason: reason || "Guild modified via bot" });
            return modifiedGuild.id; // Return ID on success
        } catch (err) {
            console.error(`Error modifying guild ${guildId}:`, err);
            return `[Error: Failed to modify guild ${guildId} - ${err.message}]`;
        }
    }
};