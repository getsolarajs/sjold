module.exports = {
    name: "$listUnion", description: "Returns unique items from both lists. Args: list1Items;list2Items", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: Requires two lists]"; const list1 = args[0].split(';'); const list2 = args[1].split(';');
        const unionSet = new Set([...list1, ...list2]); return Array.from(unionSet).join(';');
    }
};