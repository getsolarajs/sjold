module.exports = {
    name: "$percent",
    description: "Calculates what percentage value1 is of value2. Args: value1;value2",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $percent requires value1 and value2]";
        const val1 = parseFloat(args[0]);
        const val2 = parseFloat(args[1]);
        if (isNaN(val1) || isNaN(val2)) return "[Error: Invalid numbers for $percent]";
        if (val2 === 0) return "[Error: Cannot calculate percentage of zero]";
        const percentage = (val1 / val2) * 100;
        return percentage.toString();
    }
};