module.exports = {
    name: "$env", description: "Gets an environment variable's value. Args: variableName", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $env requires variableName]";
        return process.env[args[0]] || "";
    }
};