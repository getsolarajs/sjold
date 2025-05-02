module.exports = {
    name: "$replaceAll",
    description: "Replaces all occurrences of a search string with a replacement string. Args: text;search;replace",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 3) return "[Error: $replaceAll requires text, search, and replace arguments]";
        const text = args[0];
        const search = args[1];
        const replace = args[2];
        try {
            if (typeof text.replaceAll === 'function') {
                return text.replaceAll(search, replace);
            } else {
                 const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                 const regex = new RegExp(escapedSearch, 'g');
                 return text.replace(regex, replace);
            }
        } catch (e) { return `[Error during replaceAll: ${e.message}]`; }
    }
};