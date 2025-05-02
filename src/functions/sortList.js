module.exports = {
    name: "$sortList",
    description: "Sorts items alphabetically or numerically. Args: sortType(az/za/numaz/numza/asc/desc);item1;item2;...",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $sortList requires sortType and at least one item]";
        const sortType = args[0].toLowerCase(); const items = args.slice(1);
        try {
            switch(sortType) {
                case 'az': items.sort((a, b) => String(a).localeCompare(String(b))); break;
                case 'za': items.sort((a, b) => String(b).localeCompare(String(a))); break;
                case 'numaz': case 'asc':
                    items.sort((a, b) => parseFloat(a) - parseFloat(b));
                    if (items.some(item => isNaN(parseFloat(item)))) return "[Error: Cannot sort non-numeric items with numaz/asc]"; break;
                case 'numza': case 'desc':
                    items.sort((a, b) => parseFloat(b) - parseFloat(a));
                     if (items.some(item => isNaN(parseFloat(item)))) return "[Error: Cannot sort non-numeric items with numza/desc]"; break;
                default: return "[Error: Invalid sortType for $sortList. Use az, za, numaz, numza, asc, or desc]";
            }
        } catch (e) { return `[Error during sort: ${e.message}]`; }
        return items.join(';');
    }
};