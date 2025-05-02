const canvafy = require("canvafy");
const { AttachmentBuilder } = require('discord.js');
module.exports = {
    name: "$captchaCard", description: "Generates a Captcha image. Use $captchaKey separately. Args: captchaKey;[backgroundURL?];[borderColor?];[overlayOpacity?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $captchaCard requires the captchaKey (use $captchaKey)]";
        const [key, background, border, opacityStr] = args;
        const opacity = opacityStr ? parseFloat(opacityStr) : undefined;
        if (opacity !== undefined && isNaN(opacity)) return "[Error: Invalid opacity value]";
        try {
            const builder = new canvafy.Captcha().setCaptchaKey(key);
            if (background) builder.setBackground("image", background);
            if (border) builder.setBorder(border);
            if (opacity !== undefined) builder.setOverlayOpacity(opacity);

            const imageBuffer = await builder.build();
            const attachment = new AttachmentBuilder(imageBuffer, { name: `captcha-${context.user?.id || Date.now()}.png` });
            context.attachments = context.attachments || []; context.attachments.push(attachment);
            return "";
        } catch (e) { console.error("Captcha Card Error:", e); return `[Error generating captcha card: ${e.message}]`; }
    }
};