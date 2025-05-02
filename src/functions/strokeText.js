module.exports = {
    name: "$strokeText", description: "Draws text outline. Args: text;x;y;[maxWidth?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.canvasContext) return "[Error: Canvas not created]"; if (args.length < 3) return "[Error: Requires text, x, y]";
        const text = args[0]; const x = parseFloat(args[1]); const y = parseFloat(args[2]); const maxWidth = args[3] ? parseFloat(args[3]) : undefined;
        if (isNaN(x) || isNaN(y)) return "[Error: Invalid coordinates]"; if (maxWidth !== undefined && isNaN(maxWidth)) return "[Error: Invalid maxWidth]";
        context.canvasContext.strokeText(text, x, y, maxWidth); return "";
    }
};