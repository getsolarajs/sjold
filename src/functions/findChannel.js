module.exports = {
    name: "$findChannel",
    description: "Tries to find a channel ID from a mention, name, or ID in the current guild.",
    takesBrackets: true,
    execute: async (context, args) => {
        const query = args[0]?.trim();
        if (!context.guild) return "[Error: $findChannel requires a guild context]";
        if (!query) return "[Error: $findChannel requires a query]";
        if (/^\d{17,19}$/.test(query)) {
            try { const channel = await context.client.channels.fetch(query); if (channel && channel.guild?.id === context.guild.id) return query; } catch { /* Ignore */ }
        }
        const mentionMatch = query.match(/^<#(\d{17,19})>$/);
        if (mentionMatch) {
             try { const channel = await context.client.channels.fetch(mentionMatch[1]); if (channel && channel.guild?.id === context.guild.id) return mentionMatch[1]; } catch { /* Ignore */ }
        }
        const lowerQuery = query.toLowerCase();
        try {
             await context.guild.channels.fetch();
             const foundChannel = context.guild.channels.cache.find(c => c.name.toLowerCase() === lowerQuery);
             if (foundChannel) return foundChannel.id;
        } catch(fetchError){ console.warn(`$findChannel: Failed to fetch channels:`, fetchError); }
        return `[Error: Could not resolve channel "${query}" in this guild]`;
    }
};