module.exports = {
    name: "$removeContains", description: "Removes items from a list that contain a value. Args: containsValue;item1;item2...", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 1) return "[Error: Requires at least containsValue]"; if (args.length === 1) return "";
        const containsValue = args[0]; const items = args.slice(1);
        const filtered = items.filter(item => !item.includes(containsValue));
        return filtered.join(';');
    }
};