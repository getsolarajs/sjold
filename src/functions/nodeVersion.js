module.exports = {
    name: "$nodeVersion", description: "Returns the running Node.js version.", takesBrackets: false,
    execute: async (context, args) => { return process.version; }
};