module.exports = {
    name: "$random",
    description: "Returns a random integer between min and max (inclusive). Args: [min;max] or [max]",
    takesBrackets: true,
    execute: async (context, args) => {
        let min = 0, max = 0;
        if (args.length === 1) { max = parseFloat(args[0]); min = 0; }
        else if (args.length >= 2) { min = parseFloat(args[0]); max = parseFloat(args[1]); }
        else return "[Error: $random requires at least a maximum value]";
        if (isNaN(min) || isNaN(max)) return "[Error: Invalid number range provided to $random]";
        if (min > max) [min, max] = [max, min];
        min = Math.ceil(min); max = Math.floor(max);
        const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomInt.toString();
    }
};