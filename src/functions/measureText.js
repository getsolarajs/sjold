module.exports = {
    name: "$measureText", description: "Measures text width based on current font. Args: text", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.canvasContext) return "[Error: Canvas not created]"; if (!args[0]) return "[Error: Requires text]";
        const metrics = context.canvasContext.measureText(args[0]); return metrics.width.toString();
    }
};