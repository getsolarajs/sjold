module.exports = {
    name: "$roundTo",
    description: "Rounds a number to a specified number of decimal places. Args: number;decimalPlaces",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $roundTo requires number and decimalPlaces]";
        const num = parseFloat(args[0]);
        const places = parseInt(args[1], 10);
        if (isNaN(num)) return "[Error: Invalid number for $roundTo]";
        if (isNaN(places) || places < 0) return "[Error: Invalid decimalPlaces for $roundTo]";
        const factor = Math.pow(10, places);
        return (Math.round(num * factor) / factor).toString();
    }
};