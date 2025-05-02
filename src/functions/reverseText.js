module.exports = {
    name: "$reverseText", description: "Reverses a string.", takesBrackets: true,
    execute: async (context, args) => { if (!args[0]) return ""; return args[0].split('').reverse().join(''); }
};