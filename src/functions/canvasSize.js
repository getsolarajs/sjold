module.exports = {
    name: "$canvasSize", description: "Returns the size of the current canvas. Args: [property(width/height)]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.canvas) return "[Error: Canvas not created. Use $createCanvas first]";
        const prop = args[0]?.toLowerCase();
        if (prop === 'width') return context.canvas.width.toString();
        if (prop === 'height') return context.canvas.height.toString();
        return `${context.canvas.width};${context.canvas.height}`;
    }
};