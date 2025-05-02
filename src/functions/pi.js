module.exports = {
    name: "$PI",
    description: "Returns the value of PI.",
    takesBrackets: false,
    execute: async (context, args) => {
        return Math.PI.toString();
    }
};