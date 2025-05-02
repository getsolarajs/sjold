module.exports = {
    name: "$isValidDate", description: "Checks if date string is valid. Args: dateString", takesBrackets: true,
    execute: async (context, args) => { if (!args[0]) return "false"; const d = new Date(args[0]); return (!isNaN(d.getTime())).toString(); }
};