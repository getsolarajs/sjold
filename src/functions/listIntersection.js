module.exports = {
    name: "$listIntersection", description: "Returns items present in both lists. Args: list1Items;list2Items", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: Requires two lists]"; const list1 = args[0].split(';'); const list2 = args[1].split(';'); const set2 = new Set(list2);
        return list1.filter(item => set2.has(item)).join(';');
    }
};