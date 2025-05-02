module.exports = {
    name: "$imageSize", description: "Returns the size of a loaded image variable. Args: imageVarName;[property(width/height)?]", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: Requires imageVarName]"; const varName = args[0]; const prop = args[1]?.toLowerCase();
        const image = context.localVariables?.get(varName); if (!image || !image.width) return `[Error: Image var '${varName}' not found/loaded]`;
        if (prop === 'width') return image.width.toString(); if (prop === 'height') return image.height.toString();
        return `${image.width};${image.height}`;
    }
};