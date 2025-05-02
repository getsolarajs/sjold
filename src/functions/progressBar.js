module.exports = {
    name: "$progressBar",
    description: "Creates a text-based progress bar. Args: currentValue;maxValue;[length=10];[filledChar=█];[emptyChar=░]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 2) return "[Error: $progressBar requires currentValue and maxValue]";
        const currentValue = parseFloat(args[0]); const maxValue = parseFloat(args[1]);
        const length = args[2] ? parseInt(args[2], 10) : 10;
        const filledChar = args[3] || '█'; const emptyChar = args[4] || '░';
        if (isNaN(currentValue) || isNaN(maxValue)) return "[Error: Invalid number for currentValue or maxValue]";
        if (isNaN(length) || length <= 0) return "[Error: Invalid length for progressBar]";
        if (maxValue <= 0) return emptyChar.repeat(length);
        const percentage = Math.max(0, Math.min(1, currentValue / maxValue));
        const filledCount = Math.round(length * percentage); const emptyCount = length - filledCount;
        return `[${filledChar.repeat(filledCount)}${emptyChar.repeat(emptyCount)}]`;
    }
};