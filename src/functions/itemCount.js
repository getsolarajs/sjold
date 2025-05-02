module.exports = {
    name: "$itemCount",
    description: "Returns the number of items provided as arguments.",
    takesBrackets: true,
    execute: async (context, args) => {
        return args.length.toString();
    }
};