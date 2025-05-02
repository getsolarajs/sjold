module.exports = {
    name: "$unescapeMarkdown", description: "Basic attempt to remove backslashes before markdown characters.", takesBrackets: true,
    execute: async (context, args) => { if (!args[0]) return ""; return args[0].replace(/\\([*_~`|>\\])/g, '$1'); } // Simple removal
};