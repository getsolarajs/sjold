module.exports = {
    name: "$isURL", description: "Checks if text is a valid URL (basic check). Args: text", takesBrackets: true,
    execute: async (context, args) => { if (!args[0]) return "false"; try { new URL(args[0]); return "true"; } catch { return "false"; } }
};