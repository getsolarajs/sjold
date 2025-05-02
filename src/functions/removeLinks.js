module.exports = {
    name: "$removeLinks", description: "Removes URLs from text. Args: text", takesBrackets: true,
    execute: async (context, args) => { if (!args[0]) return ""; return args[0].replace(/https?:\/\/[^\s/$.?#].[^\s]*/gi, ''); }
};