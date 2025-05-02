module.exports = {
    name: "$listFlatten", description: "Flattens multiple lists into one. Args: list1;list2...", takesBrackets: true,
    execute: async (context, args) => { if (args.length === 0) return ""; return args.join(';').split(';').filter(Boolean).join(';'); }
};