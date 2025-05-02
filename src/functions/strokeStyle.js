module.exports = {
    name: "$strokeStyle", description: "Sets the stroke color/gradient/pattern. Args: color", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.canvasContext) return "[Error: Canvas not created]"; if (!args[0]) return "[Error: Requires color string]";
        context.canvasContext.strokeStyle = args[0]; return "";
    }
};