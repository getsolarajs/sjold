module.exports = {
    name: "$case",
    description: "Used within $switch to define a case. Returns nothing directly.",
    takesBrackets: true,
    execute: async (context, args) => {
        return `[Error: $case should only be used inside $switch]`;
    }
};