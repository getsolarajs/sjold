const { version } = require('canvas');
module.exports = {
    name: "$canvasVersion", description: "Returns the installed node-canvas version.", takesBrackets: false,
    execute: async (context, args) => { return version || "N/A"; }
};