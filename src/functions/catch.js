module.exports = {
    name: "$catch",
    description: "Used within $try to define error handling code. Returns nothing directly.",
    takesBrackets: true,
    execute: async (context, args) => {
        return `[Error: $catch should only be used inside $try]`;
    }
};