module.exports = {
    name: "$isString",
    description: "Checks if the provided value's internal type is string. Args: value",
    takesBrackets: true,
    execute: async (context, args) => {

        return (typeof args[0] === 'string').toString();
    }
};