const canvafy = require("canvafy");
const { AttachmentBuilder } = require('discord.js');
module.exports = {
    name: "$spotifyCard", description: "Generates a Spotify status card image. Args: title;author;album;imageURL;[startTimestampMs?];[endTimestampMs?];[blur?];[overlayOpacity?]", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 4) return "[Error: Requires title, author, album, and imageURL]";
        const [title, author, album, image, startMsStr, endMsStr, blurStr, opacityStr] = args;
        const startMs = startMsStr ? parseInt(startMsStr, 10) : undefined; const endMs = endMsStr ? parseInt(endMsStr, 10) : undefined;
        const blur = blurStr ? parseInt(blurStr, 10) : undefined; const opacity = opacityStr ? parseFloat(opacityStr) : undefined;
        if (startMs !== undefined && isNaN(startMs)) return "[Error: Invalid start timestamp]"; if (endMs !== undefined && isNaN(endMs)) return "[Error: Invalid end timestamp]";
        if (blur !== undefined && isNaN(blur)) return "[Error: Invalid blur value]"; if (opacity !== undefined && isNaN(opacity)) return "[Error: Invalid opacity value]";
        try {
            const builder = new canvafy.Spotify().setTitle(title).setAuthor(author).setAlbum(album).setImage(image);
            if (startMs !== undefined && endMs !== undefined) builder.setTimestamp(startMs, endMs);
            if (blur !== undefined) builder.setBlur(blur);
            if (opacity !== undefined) builder.setOverlayOpacity(opacity);

            const imageBuffer = await builder.build();
            const attachment = new AttachmentBuilder(imageBuffer, { name: `spotify-${context.user?.id || Date.now()}.png` });
            context.attachments = context.attachments || []; context.attachments.push(attachment);
            return "";
        } catch (e) { console.error("Spotify Card Error:", e); return `[Error generating spotify card: ${e.message}]`; }
    }
};