const axios = require('axios');
module.exports = {
    name: "$httpStatus", description: "Gets the HTTP status code for a URL (GET request). Args: url", takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $httpStatus requires a URL]"; const url = args[0];
        try { const response = await axios.get(url, { timeout: 5000, validateStatus: () => true }); return response.status.toString(); }
        catch (error) { return `[Error fetching status: ${error.message}]`; }
    }
};