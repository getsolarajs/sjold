module.exports = {
    name: "$listSlice", description: "Returns a slice of the list items. Args: startIndex;[endIndex?];item1;item2...", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 1) return "[Error: Requires startIndex]"; const start = parseInt(args[0], 10); let endIndex; let items;
        if(args[1] !== undefined && !isNaN(parseInt(args[1], 10))) { endIndex = parseInt(args[1], 10); items = args.slice(2); }
        else { endIndex = undefined; items = args.slice(1); }
        if (isNaN(start)) return "[Error: Invalid startIndex]"; if (args[1] !== undefined && isNaN(endIndex)) return "[Error: Invalid endIndex]";
        return items.slice(start, endIndex).join(';');
    }
};