module.exports = {
    name: "$font", description: "Sets the font style (CSS font string). Args: fontString", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.canvasContext) return "[Error: Canvas not created]"; if (!args[0]) return "[Error: Requires font string (e.g., '30px Arial')]";
        context.canvasContext.font = args[0]; return "";
    }
};