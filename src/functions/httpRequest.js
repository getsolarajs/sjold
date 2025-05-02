const axios = require('axios');
module.exports = {
    name: "$httpRequest",
    description: "Makes an HTTP request. [SECURITY RISK - USE WITH CAUTION] Args: url;[method=GET];[bodyJson];[headersJson]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $httpRequest requires a URL]";
        const url = args[0]; const method = args[1]?.toUpperCase() || 'GET';
        const bodyJson = args[2]; const headersJson = args[3];
        let body = undefined; let headers = undefined;
        if (bodyJson) { try { body = JSON.parse(bodyJson); } catch (e) { return `[Error: Invalid JSON body: ${e.message}]`; } }
        if (headersJson) { try { headers = JSON.parse(headersJson); } catch (e) { return `[Error: Invalid JSON headers: ${e.message}]`; } }
        try {
            const config = { method: method, url: url, headers: headers, data: body, timeout: 5000 };
            const response = await axios(config);
            let responseDataStr = '';
            if (typeof response.data === 'object') { try { responseDataStr = JSON.stringify(response.data); } catch (e) { responseDataStr = `[Error stringifying response object: ${e.message}]`; } }
            else { responseDataStr = String(response.data); }
            return responseDataStr;
        } catch (error) {
             if (error.response) { let errorDetails = ''; try { errorDetails = typeof error.response.data === 'object' ? JSON.stringify(error.response.data) : String(error.response.data); } catch (e) { errorDetails = '[Could not stringify error response data]'; } return `[HTTP Error: ${error.response.status} ${error.response.statusText}] Response: ${errorDetails}`; }
             if (error.request) return "[HTTP Error: No response received from server. Check URL or network.]";
             if (error.code === 'ECONNABORTED') return `[HTTP Error: Request timed out after 5000ms]`;
             return `[HTTP Setup Error: ${error.message}]`;
        }
    }
};