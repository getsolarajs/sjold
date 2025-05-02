const axios = require('axios');
module.exports = {
    name: "$httpHead", description: "Performs an HTTP HEAD request and returns headers as JSON. Args: url", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $httpHead requires a URL]"; const url = args[0];
        try { const response = await axios.head(url, { timeout: 5000 }); return JSON.stringify(response.headers); }
        catch (error) {
             if (error.response) return `[HTTP Error: ${error.response.status} ${error.response.statusText}]`;
             if (error.request) return "[HTTP Error: No response received]";
             return `[HTTP Error: ${error.message}]`;
        }
    }
};