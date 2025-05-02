const { registerFont } = require('canvas');
const fs = require('fs');
module.exports = {
    name: "$registerFont", description: "Registers a font file for use on the canvas. Args: fontPath;fontFamily", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: Requires fontPath and fontFamily name]";
        const fontPath = args[0]; const family = args[1];
        try { if (!fs.existsSync(fontPath)) return "[Error: Font file not found]"; registerFont(fontPath, { family: family }); return ""; }
        catch (e) { console.error("RegisterFont Error:", e); return `[Error registering font: ${e.message}]`; }
    }
};