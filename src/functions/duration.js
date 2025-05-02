function formatDuration(ms) { if (ms < 0) ms = 0; const sec = Math.floor(ms / 1000); const min = Math.floor(sec / 60); const hr = Math.floor(min / 60); const day = Math.floor(hr / 24); return `${day}d ${hr % 24}h ${min % 60}m ${sec % 60}s`; }
module.exports = {
    name: "$duration", description: "Formats milliseconds into readable duration string. Args: ms", takesBrackets: true,
    execute: async (context, args) => { if (!args[0]) return "[Error: Requires milliseconds]"; const ms = parseInt(args[0], 10); if (isNaN(ms)) return "[Error: Invalid milliseconds]"; return formatDuration(ms); }
};