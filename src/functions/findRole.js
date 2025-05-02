module.exports = {
    name: "$findRole",
    description: "Tries to find a role ID from a mention, name, or ID in the current guild.",
    takesBrackets: true,
    execute: async (context, args) => {
        const query = args[0]?.trim();
        if (!context.guild) return "[Error: $findRole requires a guild context]";
        if (!query) return "[Error: $findRole requires a query]";
        if (/^\d{17,19}$/.test(query)) {
            try { const role = await context.guild.roles.fetch(query); if (role) return query; } catch { /* Ignore */ }
        }
        const mentionMatch = query.match(/^<@&(\d{17,19})>$/);
        if (mentionMatch) {
             try { const role = await context.guild.roles.fetch(mentionMatch[1]); if (role) return mentionMatch[1]; } catch { /* Ignore */ }
        }
        const lowerQuery = query.toLowerCase();
        try {
            await context.guild.roles.fetch();
            const foundRole = context.guild.roles.cache.find(r => r.name.toLowerCase() === lowerQuery);
            if (foundRole) return foundRole.id;
        } catch(fetchError){ console.warn(`$findRole: Failed to fetch roles:`, fetchError); }
        return `[Error: Could not resolve role "${query}" in this guild]`;
    }
};