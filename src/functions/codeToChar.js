module.exports = {
    name: "$codeToChar",
    description: "Returns a string created from the specified sequence of UTF-16 code units. Args: code1;[code2...]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (args.length === 0) return "[Error: $codeToChar requires at least one code unit]";
        const codes = args.map(arg => parseInt(arg, 10));
        if (codes.some(isNaN)) return "[Error: Invalid code unit provided to $codeToChar]";
        try {
            return String.fromCharCode(...codes);
        } catch (e) { return `[Error converting codes to char: ${e.message}]`; }
    }
};