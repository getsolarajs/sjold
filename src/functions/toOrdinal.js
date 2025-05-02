module.exports = {
    name: "$ordinal",
    description: "Returns the ordinal form of a number (e.g., 1st, 2nd, 3rd). Args: number",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length !== 1) return "[Error: $ordinal requires exactly one number]";
        
        const number = parseInt(args[0]);

        if (isNaN(number)) return "[Error: Expected a number]";

        const str = number.toString();
        const lastDigit = str.slice(-1);
        const lastTwoDigits = str.slice(-2);

        if (["11", "12", "13"].includes(lastTwoDigits)) {
            return `${number}th`;
        }

        if (lastDigit === "1") return `${number}st`;
        if (lastDigit === "2") return `${number}nd`;
        if (lastDigit === "3") return `${number}rd`;

        return `${number}th`;
    }
};  