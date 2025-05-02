const canvafy = require("canvafy");
const { AttachmentBuilder } = require('discord.js');
module.exports = {
    name: "$rankCard", description: "Generates a rank card image. Args: username;level;rank;currentXP;requiredXP;[avatarURL?];[backgroundURL?];[status?];[borderColor?];[progressBarColor?]", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 5) return "[Error: Requires username, level, rank, currentXP, requiredXP]";
        const [username, levelStr, rankStr, currentXpStr, requiredXpStr, avatar, background, status, border, progressColor] = args;
        const level = parseInt(levelStr, 10); const rank = parseInt(rankStr, 10); const currentXp = parseInt(currentXpStr, 10); const requiredXp = parseInt(requiredXpStr, 10);
        if (isNaN(level) || isNaN(rank) || isNaN(currentXp) || isNaN(requiredXp)) return "[Error: Level, rank, XP values must be numbers]";
        try {
            const builder = new canvafy.Rank().setUsername(username).setLevel(level).setRank(rank).setCurrentXp(currentXp).setRequiredXp(requiredXp);
            if (avatar) builder.setAvatar(avatar); else if (context.user) builder.setAvatar(context.user.displayAvatarURL({ forceStatic: true, extension: "png" }));
            if (background) builder.setBackground("image", background);
            if (status && ['online', 'idle', 'dnd', 'offline'].includes(status.toLowerCase())) builder.setStatus(status.toLowerCase());
            if (border) builder.setBorder(border);
            if (progressColor) builder.setBarColor(progressColor);

            const imageBuffer = await builder.build();
            const attachment = new AttachmentBuilder(imageBuffer, { name: `rank-${context.user?.id || Date.now()}.png` });
            context.attachments = context.attachments || []; context.attachments.push(attachment);
            return "";
        } catch (e) { console.error("Rank Card Error:", e); return `[Error generating rank card: ${e.message}]`; }
    }
};