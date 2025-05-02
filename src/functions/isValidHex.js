const { resolveColor } = require('discord.js');
module.exports = {
    name: "$isValidHex",
    description: "Checks if the provided string is a valid hex color code. Returns true or false.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "false";
        try { resolveColor(args[0]); return (/^#([0-9a-f]{3}){1,2}$/i.test(args[0])).toString(); }
        catch (e) { return "false"; }
    }
};