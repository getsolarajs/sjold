module.exports = {
    name: "$isEmpty",
    description: "Checks if the provided text is empty. Args: text",
    takesBrackets: true,
    execute: async (context, args) => {
        return (args[0] === undefined || args[0] === null || String(args[0]).trim() === "").toString();
    }
};