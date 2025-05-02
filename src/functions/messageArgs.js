module.exports = {
    name: "$messageArgs", description: "Returns semicolon-separated arguments from a prefix command.", takesBrackets: false,
    execute: async (context, args) => {
        return context.args?.join(';') || "";
    }
};