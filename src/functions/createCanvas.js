const { createCanvas } = require('canvas');
module.exports = {
    name: "$createCanvas", description: "Creates a new canvas context for drawing. Args: width;height", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: Requires width and height]";
        const width = parseInt(args[0], 10); const height = parseInt(args[1], 10);
        if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0 || width > 4000 || height > 4000) return "[Error: Invalid canvas dimensions (1-4000)]";
        try {
            context.canvas = createCanvas(width, height);
            context.canvasContext = context.canvas.getContext('2d');
            return "";
        } catch (e) { console.error("CreateCanvas Error:", e); return `[Error creating canvas: ${e.message}]`; }
    }
};