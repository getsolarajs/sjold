module.exports = {
    name: "$listChunk", description: "Splits list into chunks of specified size. Returns JSON array of arrays. Args: chunkSize;item1;item2...", takesBrackets: true,
    execute: async (context, args) => {
        if (args.length < 1) return "[Error: Requires chunkSize]"; const size = parseInt(args[0], 10); const items = args.slice(1);
        if (isNaN(size) || size < 1) return "[Error: Invalid chunkSize]"; if (items.length === 0) return "[]";
        const chunks = []; for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size)); return JSON.stringify(chunks);
    }
};