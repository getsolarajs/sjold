module.exports = {
    name: "$messageURL",
    description: "Returns the URL of the command message (if applicable).",
    takesBrackets: false,
    execute: async (context, args) => {
        return context.message?.url || "";
    }
};