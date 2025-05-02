module.exports = {
    name: "$isBoolean",
    description: "Checks if the provided value is 'true' or 'false'. Args: value",
    takesBrackets: true,
    execute: async (context, args) => {
        const val = args[0]?.toLowerCase().trim();
        return (val === 'true' || val === 'false').toString();
    }
};