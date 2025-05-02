const canvafy = require("canvafy");
const { AttachmentBuilder } = require('discord.js');
module.exports = {
    name: "$welcomeCard", description: "Generates a welcome card image and attaches it. Args: title;description;[avatarURL?];[backgroundURL?];[borderColor?];[avatarBorderColor?];[overlayOpacity?]", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: Requires title and description]";
        const [title, description, avatar, background, border, avatarBorder, opacity] = args;
        try {
            const builder = new canvafy.WelcomeLeave().setTitle(title).setDescription(description);
            if (avatar) builder.setAvatar(avatar); else if (context.user) builder.setAvatar(context.user.displayAvatarURL({ forceStatic: true, extension: "png" }));
            if (background) builder.setBackground("image", background);
            if (border) builder.setBorder(border);
            if (avatarBorder) builder.setAvatarBorder(avatarBorder);
            if (opacity && !isNaN(parseFloat(opacity))) builder.setOverlayOpacity(parseFloat(opacity));

            const imageBuffer = await builder.build();
            const attachment = new AttachmentBuilder(imageBuffer, { name: `welcome-${context.user?.id || Date.now()}.png` });
            context.attachments = context.attachments || []; context.attachments.push(attachment);
            return "";
        } catch (e) { console.error("Welcome Card Error:", e); return `[Error generating welcome card: ${e.message}]`; }
    }
};