const { loadImage } = require('canvas');
module.exports = {
    name: "$loadImage", description: "Loads an image for drawing onto the canvas. Stores internally. Args: urlOrPath;[variableName]", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires image URL or file path]";
        const source = args[0]; const varName = args[1]?.trim() || `loadedImage_${Date.now()}`;
        try {
            const image = await loadImage(source);
            context.localVariables = context.localVariables || new Map();
            context.localVariables.set(varName, image); 
            return varName; 
        } catch (e) { console.error(`LoadImage Error (${source}):`, e); return `[Error loading image: ${e.message}]`; }
    }
};