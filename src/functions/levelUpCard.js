const canvafy = require("canvafy");
const { AttachmentBuilder } = require('discord.js');
module.exports = {
    name: "$levelUpCard", description: "Generates a Level Up card image. Args: username;oldLevel;newLevel;[avatarURL?];[backgroundURL?];[borderColor?];[avatarBorderColor?];[overlayOpacity?]", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 3) return "[Error: Requires username, oldLevel, and newLevel]";
        const [username, oldLevelStr, newLevelStr, avatar, background, border, avatarBorder, opacityStr] = args;
        const oldLevel = parseInt(oldLevelStr, 10); const newLevel = parseInt(newLevelStr, 10); const opacity = opacityStr ? parseFloat(opacityStr) : undefined;
        if (isNaN(oldLevel) || isNaN(newLevel)) return "[Error: Levels must be numbers]"; if (opacity !== undefined && isNaN(opacity)) return "[Error: Invalid opacity value]";
        try {
            const builder = new canvafy.LevelUp().setUsername(username).setLevels(oldLevel, newLevel);
            if (avatar) builder.setAvatar(avatar); else if (context.user) builder.setAvatar(context.user.displayAvatarURL({ forceStatic: true, extension: "png" }));
            if (background) builder.setBackground("image", background);
            if (border) builder.setBorder(border);
            if (avatarBorder) builder.setAvatarBorder(avatarBorder);
            if (opacity !== undefined) builder.setOverlayOpacity(opacity);

            const imageBuffer = await builder.build();
            const attachment = new AttachmentBuilder(imageBuffer, { name: `levelup-${context.user?.id || Date.now()}.png` });
            context.attachments = context.attachments || []; context.attachments.push(attachment);
            return "";
        } catch (e) { console.error("LevelUp Card Error:", e); return `[Error generating levelup card: ${e.message}]`; }
    }
};