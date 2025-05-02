module.exports = {
    name: "$formatDate",
    description: "Formats a timestamp using Intl.DateTimeFormat. Args: timestampMs;[optionsJson];[locale=en-US]",
    takesBrackets: true,
    execute: async (context, args) => {
        if (!args[0]) return "[Error: $formatDate requires a timestamp in milliseconds]";
        const timestampMs = parseInt(args[0], 10);
        const optionsJson = args[1]; const locale = args[2] || 'en-US';
        if (isNaN(timestampMs)) return "[Error: Invalid timestamp number for $formatDate]";
        let options = undefined;
        if (optionsJson) {
            try { options = JSON.parse(optionsJson); }
            catch (e) { return `[Error: Invalid JSON options for $formatDate: ${e.message}]`; }
        }
        try { const date = new Date(timestampMs); return new Intl.DateTimeFormat(locale, options).format(date); }
        catch (e) { return `[Error formatting date: ${e.message}]`; }
    }
};