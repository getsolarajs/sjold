module.exports = {
    name: "$padStart",
    description: "Pads the start of the current string until it reaches the given length. Args: text;targetLength;[padString=' ']",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $padStart requires text and targetLength]";
        const text = args[0]; const targetLength = parseInt(args[1], 10);
        const padString = args[2] !== undefined ? args[2] : ' ';
        if (isNaN(targetLength)) return "[Error: Invalid targetLength for $padStart]";
        return text.padStart(targetLength, padString);
    }
};