module.exports = {
    name: "$fillStyle", description: "Sets the fill color/gradient/pattern. Args: color", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.canvasContext) return "[Error: Canvas not created]"; if (!args[0]) return "[Error: Requires color string]";
        context.canvasContext.fillStyle = args[0]; return "";
    }
};