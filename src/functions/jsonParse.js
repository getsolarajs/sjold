module.exports = {
    name: "$jsonParse",
    description: "Parses a JSON string and stores the object internally for use with $json[key]. Args: jsonString",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) {
            context.parsedJson = null; 
            return "[Error: $jsonParse requires a JSON string]";
        }
        const jsonString = args[0];
        try {
            context.parsedJson = JSON.parse(jsonString); 
            return ""; 
        } catch (e) {
            context.parsedJson = null; 
            return `[Error: Invalid JSON string - ${e.message}]`;
        }
    }
};