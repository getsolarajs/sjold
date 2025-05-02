module.exports = {
    name: "$modifyEmoji", description: "Modifies an emoji in the current guild. Args: emojiID;[newName];[rolesJson];[reason]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.guild) return "[Error: Requires guild context]"; if (!args[0]) return "[Error: Requires emoji ID]";
        const emojiId = args[0]; const newName = args[1]; const rolesJson = args[2]; const reason = args[3];
        let options = {}; let roles;
        if (newName !== undefined && newName !== "") options.name = newName; // Allow changing name
        if (rolesJson !== undefined) { try { roles = JSON.parse(rolesJson); if (!Array.isArray(roles)) throw new Error(); options.roles = roles; } catch { return "[Error: Invalid roles JSON array]"; } }
        if (Object.keys(options).length === 0) return "[Error: Nothing to modify]";
        try { if (!context.guild.members.me?.permissions.has("ManageEmojisAndStickers")) return "[Error: Bot lacks Manage Emojis permission]"; const emoji = await context.guild.emojis.fetch(emojiId); if (!emoji) return "[Error: Emoji not found]"; const modified = await emoji.edit(options, reason || "Emoji modified via bot"); return modified.toString(); }
        catch (e) { return `[Error modifying emoji: ${e.message}]`; }
    }
};