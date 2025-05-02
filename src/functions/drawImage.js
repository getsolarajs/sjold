module.exports = {
    name: "$drawImage", description: "Draws a loaded image onto the canvas. Args: imageVarName;dx;dy;[dw?];[dh?];[sx?];[sy?];[sw?];[sh?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!context.canvasContext) return "[Error: Canvas not created]"; if (args.length < 3) return "[Error: Requires imageVarName, dx, dy]";
        const varName = args[0]; const dx = parseFloat(args[1]); const dy = parseFloat(args[2]);
        const dw = args[3] ? parseFloat(args[3]) : undefined; const dh = args[4] ? parseFloat(args[4]) : undefined;
        const sx = args[5] ? parseFloat(args[5]) : undefined; const sy = args[6] ? parseFloat(args[6]) : undefined;
        const sw = args[7] ? parseFloat(args[7]) : undefined; const sh = args[8] ? parseFloat(args[8]) : undefined;
        const image = context.localVariables?.get(varName);
        if (!image || !image.width) return `[Error: Image variable '${varName}' not found or not loaded]`;
        if (isNaN(dx) || isNaN(dy)) return "[Error: Invalid dx/dy coordinates]";
        try {
            if (sx !== undefined && sy !== undefined && sw !== undefined && sh !== undefined && dw !== undefined && dh !== undefined) {
                if ([dw, dh, sx, sy, sw, sh].some(isNaN)) return "[Error: Invalid optional drawImage arguments]";
                context.canvasContext.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
            } else if (dw !== undefined && dh !== undefined) {
                if ([dw, dh].some(isNaN)) return "[Error: Invalid dw/dh arguments]";
                context.canvasContext.drawImage(image, dx, dy, dw, dh);
            } else {
                context.canvasContext.drawImage(image, dx, dy);
            } return "";
        } catch (e) { console.error("DrawImage Error:", e); return `[Error drawing image: ${e.message}]`; }
    }
};