module.exports = {
    name: "$findNthOccurrence", description: "Finds the index of the Nth occurrence of a substring. Args: text;search;occurrence", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 3) return "[Error: Requires text, search, and occurrence number]";
        const text = args[0]; const search = args[1]; const n = parseInt(args[2], 10);
        if (isNaN(n) || n < 1) return "[Error: Occurrence must be >= 1]";
        let index = -1; let count = 0; let i = -1;
        while (count < n && (i = text.indexOf(search, i + 1)) !== -1) { count++; index = i; }
        return count === n ? index.toString() : "-1";
    }
};