module.exports = {
    name: "$fillRect", description: "Draws a filled rectangle. Args: x;y;width;height", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.canvasContext) return "[Error: Canvas not created]"; if (args.length < 4) return "[Error: Requires x, y, width, height]";
        const coords = args.map(parseFloat); if (coords.some(isNaN)) return "[Error: Invalid coordinates/dimensions]";
        context.canvasContext.fillRect(coords[0], coords[1], coords[2], coords[3]); return "";
    }
};