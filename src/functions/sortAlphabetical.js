module.exports = {
    name: "$sortAlphabetical",
    description: "Sorts items alphabetically (case-insensitive). Args: sortOrder(az/za);item1;item2;...",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $sortAlphabetical requires sortOrder (az/za) and at least one item]";
        const sortOrder = args[0].toLowerCase();
        const items = args.slice(1);
        if (sortOrder === 'az') {
            items.sort((a, b) => String(a).localeCompare(String(b), undefined, { sensitivity: 'base' }));
        } else if (sortOrder === 'za') {
            items.sort((a, b) => String(b).localeCompare(String(a), undefined, { sensitivity: 'base' }));
        } else {
            return "[Error: Invalid sortOrder for $sortAlphabetical. Use az or za]";
        }
        return items.join(';');
    }
};