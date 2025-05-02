module.exports = {
    name: "$textAlign", description: "Sets text alignment. Args: alignment(left/right/center/start/end)", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.canvasContext) return "[Error: Canvas not created]"; if (!args[0]) return "[Error: Requires alignment]";
        const align = args[0].toLowerCase(); if (!['left', 'right', 'center', 'start', 'end'].includes(align)) return "[Error: Invalid alignment]";
        context.canvasContext.textAlign = align; return "";
    }
};