module.exports = {
    name: "$E",
    description: "Returns the value of Euler's number E.",
    takesBrackets: false,
    execute: async (context, args) => {
        return Math.E.toString();
    }
};