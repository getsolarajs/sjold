module.exports = {
    name: "$isValidJson",
    description: "Checks if a string is valid JSON. Args: text",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "false";
        try { JSON.parse(args[0]); return "true"; }
        catch (e) { return "false"; }
    }
};