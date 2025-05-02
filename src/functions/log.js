module.exports = {
    name: "$log",
    description: "Logs text to the bot's console.",
    takesBrackets: true,
    execute: async (context, args) => {
        console.log("Solara log:", ...args); // Log all arguments
        return "";
    }
};