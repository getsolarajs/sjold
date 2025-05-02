module.exports = {
    name: "$removeDuplicates",
    description: "Removes duplicate items from a list. Args: item1;item2;...",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length === 0) return "";
        const uniqueItems = [...new Set(args)]; 
        return uniqueItems.join(';');
    }
};