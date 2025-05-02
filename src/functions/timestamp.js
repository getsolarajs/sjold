const { time, TimestampStyles } = require('discord.js');
module.exports = {
    name: "$timeStamp",
    description: "Formats a timestamp for Discord display. Args: [style];[timestampMs]",
    takesBrackets: true,
    execute: async (context, args) => {
        const styleArg = args[0]?.trim(); const msArg = args[1]?.trim();
        let targetTimestamp = Date.now();
        if (msArg) {
            const parsedMs = parseInt(msArg, 10);
            if (!isNaN(parsedMs)) targetTimestamp = parsedMs;
            else return "[Error: Invalid timestamp number for $timeStamp]";
        }
        const dateObject = new Date(targetTimestamp);
        let style = TimestampStyles.ShortDateTime;
        if (styleArg) {
             switch (styleArg.toLowerCase()) {
                 case 't': case 'shorttime': style = TimestampStyles.ShortTime; break;
                 case 'T': case 'longtime': style = TimestampStyles.LongTime; break;
                 case 'd': case 'shortdate': style = TimestampStyles.ShortDate; break;
                 case 'D': case 'longdate': style = TimestampStyles.LongDate; break;
                 case 'f': case 'shortdatetime': style = TimestampStyles.ShortDateTime; break;
                 case 'F': case 'longdatetime': style = TimestampStyles.LongDateTime; break;
                 case 'r': case 'relative': style = TimestampStyles.RelativeTime; break;
                 default: return `[Error: Invalid style "${styleArg}" for $timeStamp. Use t, T, d, D, f, F, or R]`;
             }
        }
        try { return time(dateObject, style); }
        catch(e) { return `[Error formatting timestamp: ${e.message}]`; }
    }
};