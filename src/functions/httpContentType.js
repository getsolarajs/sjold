const axios = require('axios');
module.exports = {
    name: "$httpContentType", description: "Gets the Content-Type header for a URL (HEAD request). Args: url", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $httpContentType requires a URL]"; const url = args[0];
        try { const response = await axios.head(url, { timeout: 5000 }); return response.headers?.['content-type'] || ""; }
        catch (error) { return `[Error fetching content type: ${error.message}]`; }
    }
};