module.exports = {
    name: "$titleCase",
    description: "Converts text to title case (e.g., 'hello world' becomes 'Hello World'). Args: text",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "";
        const text = args[0].toLowerCase();
        return text.replace(/\b\w/g, char => char.toUpperCase());
    }
};