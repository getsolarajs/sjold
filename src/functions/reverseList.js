module.exports = {
    name: "$reverseList",
    description: "Reverses the order of items in a list. Args: item1;item2;...",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length === 0) return "";
        return args.reverse().join(';'); 
    }
};