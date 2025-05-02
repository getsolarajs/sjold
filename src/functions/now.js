module.exports = {
    name: "$now",
    description: "Returns the current timestamp in milliseconds.",
    takesBrackets: false,
    execute: async (context, args) => {
        return Date.now().toString();
    }
};