const axios = require('axios');

module.exports = {
    name: "$functionInfo",
    description: "Fetches description and usage information for a specific bdscript function from the API.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) {
            return "[Error: $functionInfo requires a function name (without $)]";
        }
        let funcName = args[0].trim();

        if (funcName.startsWith('$')) {
            funcName = funcName.substring(1);
        }
        if (!funcName) {
            return "[Error: Function name cannot be empty]";
        }

        const apiUrl = `https://solarajs-api.vercel.app/api?functionname=${encodeURIComponent(funcName)}`;

        try {
            const response = await axios.get(apiUrl, { timeout: 5000 });

            if (response.status === 200 && response.data?.info) {
                const info = response.data.info;
                const name = info.name || `$${funcName}`;
                const description = info.description || "No description available.";
                const usageArgs = info.args || "none";
                const usage = `${name}${usageArgs !== 'none' ? `[${usageArgs}]` : ''}`;

                return `**${usage}**: ${description}`;
            } else {
                 return `[Error: Function '${funcName}' not found or invalid API response]`;
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    return `[Error: Function '${funcName}' not found in API]`;
                } else {
                    return `[Error: API request failed with status ${error.response.status}]`;
                }
            } else if (error.request) {
                return "[Error: API did not respond]";
            } else {
                console.error("Error in $functionInfo:", error.message);
                return `[Error: Failed to fetch function info - ${error.message}]`;
            }
        }
    }
};