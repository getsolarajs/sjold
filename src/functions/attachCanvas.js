const { AttachmentBuilder } = require('discord.js');
module.exports = {
    name: "$attachCanvas", description: "Attaches the current canvas as an image file to the response. Args: [fileName=canvas.png];[quality?];[compressionLevel?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.canvas) return "[Error: Canvas not created]";
        const fileName = args[0] || 'canvas.png';
        const quality = args[1] ? parseFloat(args[1]) : undefined;
        const compressionLevel = args[2] ? parseInt(args[2], 10) : undefined;
        try {
            const buffer = context.canvas.toBuffer('image/png', { quality, compressionLevel });
            const attachment = new AttachmentBuilder(buffer, { name: fileName });
            context.attachments = context.attachments || []; context.attachments.push(attachment);
            return "";
        } catch (e) { console.error("AttachCanvas Error:", e); return `[Error attaching canvas: ${e.message}]`; }
    }
};