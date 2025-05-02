module.exports = {
    name: "$textBaseline", description: "Sets text baseline. Args: baseline(top/hanging/middle/alphabetic/ideographic/bottom)", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.canvasContext) return "[Error: Canvas not created]"; if (!args[0]) return "[Error: Requires baseline]";
        const baseline = args[0].toLowerCase(); if (!['top', 'hanging', 'middle', 'alphabetic', 'ideographic', 'bottom'].includes(baseline)) return "[Error: Invalid baseline]";
        context.canvasContext.textBaseline = baseline; return "";
    }
};