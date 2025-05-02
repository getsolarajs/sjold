module.exports = {
    name: "$json",
    description: "Retrieves value from last parsed JSON ($jsonParse). Args: [keyPath]. No args returns full JSON string.",
    takesBrackets: true,
    execute: async (context, args) => {
        if (context.parsedJson === null || context.parsedJson === undefined) {
            return "[Error: No JSON object parsed yet. Use $jsonParse first.]";
        }

        const keyPath = args[0]?.trim();

        if (args.length === 0 || keyPath === undefined) {
            try {
                return JSON.stringify(context.parsedJson);
            } catch (e) {
                return "[Error: Failed to stringify stored JSON object]";
            }
        }

        try {
            const pathParts = keyPath.split('.').filter(p => p.length > 0);
            let current = context.parsedJson;

            for (const part of pathParts) {
                if (current === null || current === undefined) return ""; 

                const arrayMatch = part.match(/^(.+?)\[(\d+)\]$/); 
                const bareIndexMatch = part.match(/^\[(\d+)\]$/); 

                if (arrayMatch) {
                    const key = arrayMatch[1];
                    const index = parseInt(arrayMatch[2], 10);
                    if (key) {
                         if (typeof current !== 'object' || current === null || !(key in current)) return "";
                         current = current[key];
                    }
                    if (!Array.isArray(current) || index >= current.length || index < 0) return "";
                    current = current[index];
                } else if (bareIndexMatch) {
                     const index = parseInt(bareIndexMatch[1], 10);
                     if (!Array.isArray(current) || index >= current.length || index < 0) return "";
                     current = current[index];
                }
                 else {
                    if (typeof current !== 'object' || current === null || !(part in current)) return "";
                    current = current[part];
                }
            }

            if (current === null || current === undefined) return "";
            if (typeof current === 'object') return JSON.stringify(current);
            return String(current);

        } catch (e) {
            console.error(`Error accessing JSON path "${keyPath}":`, e);
            return `[Error accessing JSON path: ${e.message}]`;
        }
    }
};