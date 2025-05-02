module.exports = {
    name: "$isMessage",
    description: "Returns true if the command context is a message, false otherwise.",
    takesBrackets: false,
    execute: async (context, args) => {
        return (!!context.message).toString();
    }
};