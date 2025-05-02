module.exports = {
    name: "$listContainsAny", description: "Checks if list1 contains any item from list2. Args: list1Items;list2Items", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: Requires two lists]"; const list1 = args[0].split(';'); const list2 = args[1].split(';');
        if (list2.length === 0) return "false"; const set1 = new Set(list1); return list2.some(item => set1.has(item)).toString();
    }
};