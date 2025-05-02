module.exports = {
    name: "$padEnd",
    description: "Pads the end of the current string until it reaches the given length. Args: text;targetLength;[padString=' ']",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $padEnd requires text and targetLength]";
        const text = args[0]; const targetLength = parseInt(args[1], 10);
        const padString = args[2] !== undefined ? args[2] : ' ';
        if (isNaN(targetLength)) return "[Error: Invalid targetLength for $padEnd]";
        return text.padEnd(targetLength, padString);
    }
};