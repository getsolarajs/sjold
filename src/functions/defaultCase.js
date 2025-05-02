module.exports = {
    name: "$defaultCase",
    description: "Used within $switch to define the default case. Returns nothing directly.",
    takesBrackets: true,
    execute: async (context, args) => {
        return `[Error: $defaultCase should only be used inside $switch]`;
    }
};